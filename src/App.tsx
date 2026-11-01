import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FamilyTreeCanvas } from './components/FamilyTreeCanvas';
import { PersonModal } from './components/PersonModal';
import { ContributionModal } from './components/ContributionModal';
import { ContributionTracker } from './components/ContributionTracker';
import { AdminDashboard } from './components/AdminDashboard';
import { Encyclopedia } from './components/Encyclopedia';
import { MemorialArchive } from './components/MemorialArchive';
import { HistoryAndMemories } from './components/HistoryAndMemories';
import { FamilyNews } from './components/FamilyNews';
import { PhotoGallery } from './components/PhotoGallery';
import { KinshipModal } from './components/KinshipModal';
import { FamilyStatsModal } from './components/FamilyStatsModal';
import { Footer } from './components/Footer';

import { familyService } from './services/familyService';
import { Person, FamilyBranch, Story, HistoricalDocument, FamilyPost, Memory } from './types/database';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Data state
  const [persons, setPersons] = useState<Person[]>([]);
  const [branches, setBranches] = useState<FamilyBranch[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [documents, setDocuments] = useState<HistoricalDocument[]>([]);
  const [posts, setPosts] = useState<FamilyPost[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [pendingContributionsCount, setPendingContributionsCount] = useState<number>(0);

  // Modals state
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [contributionModalOpen, setContributionModalOpen] = useState(false);
  const [contributionTargetPerson, setContributionTargetPerson] = useState<Person | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [kinshipModalOpen, setKinshipModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);

  // Load all platform data
  const loadPlatformData = async () => {
    try {
      const pList = await familyService.getPersons();
      setPersons(pList);
      const bList = await familyService.getBranches();
      setBranches(bList);
      const sList = await familyService.getStories();
      setStories(sList);
      const dList = await familyService.getDocuments();
      setDocuments(dList);
      const postList = await familyService.getPosts();
      setPosts(postList);
      const memList = await familyService.getMemories();
      setMemories(memList);

      const allContribs = await familyService.getAllContributions();
      setPendingContributionsCount(allContribs.filter(c => c.status === 'pending').length);
    } catch (err) {
      console.error('Error loading platform data:', err);
    }
  };

  useEffect(() => {
    loadPlatformData();

    // Check URL parameters for direct link to person
    const params = new URLSearchParams(window.location.search);
    const personId = params.get('person');
    if (personId) {
      familyService.getPersonById(personId).then(p => {
        if (p) setSelectedPerson(p);
      });
    }

    const tab = params.get('tab');
    if (tab) setCurrentTab(tab);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleOpenContributionForPerson = (p: Person) => {
    setContributionTargetPerson(p);
    setContributionModalOpen(true);
  };

  const handleGeneralContribution = () => {
    setContributionTargetPerson(null);
    setContributionModalOpen(true);
  };

  const deceasedPersons = persons.filter(p => p.is_deceased);
  const totalGenerations = Math.max(...persons.map(p => p.generation), 1);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        pendingContributionsCount={pendingContributionsCount}
        openContributionModal={handleGeneralContribution}
        openAdminModal={() => setAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div className="space-y-6">
            <Hero
              onExploreTree={() => setCurrentTab('tree')}
              onOpenContribution={handleGeneralContribution}
              onOpenEncyclopedia={() => setCurrentTab('encyclopedia')}
              totalPersons={persons.length}
              totalGenerations={totalGenerations}
              totalBranches={branches.length}
            />

            {/* Quick Teaser of Tree on Homepage */}
            <FamilyTreeCanvas
              persons={persons}
              branches={branches}
              onSelectPerson={setSelectedPerson}
              selectedPersonId={selectedPerson?.id}
              onOpenKinship={() => setKinshipModalOpen(true)}
              onOpenStats={() => setStatsModalOpen(true)}
            />

            {/* Memorial Section preview */}
            <MemorialArchive
              deceasedPersons={deceasedPersons.slice(0, 6)}
              onSelectPerson={setSelectedPerson}
              onOpenContribution={handleOpenContributionForPerson}
            />

            {/* History Preview */}
            <HistoryAndMemories
              stories={stories}
              documents={documents}
              onOpenContribution={handleGeneralContribution}
            />

            {/* Gallery Preview */}
            <PhotoGallery
              onOpenContribution={handleGeneralContribution}
            />

            {/* News */}
            <FamilyNews
              posts={posts}
              onOpenContribution={handleGeneralContribution}
            />
          </div>
        )}

        {currentTab === 'tree' && (
          <div className="py-4">
            <FamilyTreeCanvas
              persons={persons}
              branches={branches}
              onSelectPerson={setSelectedPerson}
              selectedPersonId={selectedPerson?.id}
              onOpenKinship={() => setKinshipModalOpen(true)}
              onOpenStats={() => setStatsModalOpen(true)}
            />
          </div>
        )}

        {currentTab === 'encyclopedia' && (
          <Encyclopedia
            persons={persons}
            onSelectPerson={setSelectedPerson}
            onOpenContribution={handleOpenContributionForPerson}
          />
        )}

        {currentTab === 'memorial' && (
          <MemorialArchive
            deceasedPersons={deceasedPersons}
            onSelectPerson={setSelectedPerson}
            onOpenContribution={handleOpenContributionForPerson}
          />
        )}

        {currentTab === 'gallery' && (
          <PhotoGallery
            onOpenContribution={handleGeneralContribution}
          />
        )}

        {currentTab === 'history' && (
          <HistoryAndMemories
            stories={stories}
            documents={documents}
            onOpenContribution={handleGeneralContribution}
          />
        )}

        {currentTab === 'news' && (
          <FamilyNews
            posts={posts}
            onOpenContribution={handleGeneralContribution}
          />
        )}

        {currentTab === 'track' && (
          <ContributionTracker />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenContribution={handleGeneralContribution}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Person Dossier Modal */}
      <PersonModal
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onSelectRelative={setSelectedPerson}
        onOpenContributionForPerson={handleOpenContributionForPerson}
        allPersons={persons}
        memories={memories}
      />

      {/* 2. Public Contribution Smart Modal */}
      <ContributionModal
        isOpen={contributionModalOpen}
        onClose={() => setContributionModalOpen(false)}
        targetPerson={contributionTargetPerson}
        allPersons={persons}
        onContributionSubmitted={loadPlatformData}
      />

      {/* 3. Central Admin Review & Management Dashboard */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        onLogout={() => setIsAdminLoggedIn(false)}
        onDataUpdated={loadPlatformData}
        persons={persons}
      />

      {/* 4. Kinship Calculator Modal */}
      <KinshipModal
        isOpen={kinshipModalOpen}
        onClose={() => setKinshipModalOpen(false)}
        persons={persons}
        initialPersonAId={selectedPerson?.id}
        onSelectPerson={setSelectedPerson}
      />

      {/* 5. Family Statistics & Analytics Modal */}
      <FamilyStatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        persons={persons}
        branches={branches}
      />

    </div>
  );
};

export default App;
