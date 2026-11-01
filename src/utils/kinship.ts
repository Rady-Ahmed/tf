// Kinship & Genealogy Calculation Engine for AL RADY FAMILY LEGACY
import { Person } from '../types/database';

export interface KinshipResult {
  personA: Person;
  personB: Person;
  commonAncestor: Person | null;
  relationshipDescription: string;
  relationshipTerm: string;
  pathA: Person[];
  pathB: Person[];
  distance: number;
}

export function findAncestryPath(personId: string, personMap: Map<string, Person>): Person[] {
  const path: Person[] = [];
  let curr: Person | undefined = personMap.get(personId);
  const visited = new Set<string>();

  while (curr && !visited.has(curr.id)) {
    visited.add(curr.id);
    path.push(curr);
    curr = curr.father_id ? personMap.get(curr.father_id) : undefined;
  }
  return path;
}

export function calculateKinship(
  personAId: string,
  personBId: string,
  personMap: Map<string, Person>
): KinshipResult | null {
  const personA = personMap.get(personAId);
  const personB = personMap.get(personBId);

  if (!personA || !personB) return null;

  if (personA.id === personB.id) {
    return {
      personA,
      personB,
      commonAncestor: personA,
      relationshipDescription: 'نفس الشخص',
      relationshipTerm: 'هو نفس الشخص',
      pathA: [personA],
      pathB: [personB],
      distance: 0
    };
  }

  const pathA = findAncestryPath(personA.id, personMap);
  const pathB = findAncestryPath(personB.id, personMap);

  const setA = new Map<string, number>();
  pathA.forEach((p, idx) => setA.set(p.id, idx));

  let commonAncestor: Person | null = null;
  let distA = -1;
  let distB = -1;

  for (let i = 0; i < pathB.length; i++) {
    const pB = pathB[i];
    if (setA.has(pB.id)) {
      commonAncestor = pB;
      distB = i;
      distA = setA.get(pB.id)!;
      break;
    }
  }

  if (!commonAncestor) {
    return {
      personA,
      personB,
      commonAncestor: null,
      relationshipDescription: 'لا يوجد جد مشترك مسجل في قاعدة البيانات',
      relationshipTerm: 'غير متصل بالنسب المسجل',
      pathA,
      pathB,
      distance: -1
    };
  }

  const subPathA = pathA.slice(0, distA + 1);
  const subPathB = pathB.slice(0, distB + 1);

  let term = '';
  let desc = '';

  // Case 1: Direct Ancestor / Descendant
  if (distA === 0) {
    if (distB === 1) {
      term = 'الوالد (الأب)';
      desc = `${personA.first_name} هو والد ${personB.first_name}`;
    } else if (distB === 2) {
      term = 'الجد المباشر';
      desc = `${personA.first_name} هو جد ${personB.first_name} من جهة الأب`;
    } else {
      term = `جد من الدرجة ${distB}`;
      desc = `${personA.first_name} هو جد ${personB.first_name} (يفصل بينهما ${distB} أجيال)`;
    }
  } else if (distB === 0) {
    if (distA === 1) {
      term = 'الابن';
      desc = `${personA.first_name} هو ابن ${personB.first_name}`;
    } else if (distA === 2) {
      term = 'الحفيد';
      desc = `${personA.first_name} هو حفيد ${personB.first_name}`;
    } else {
      term = `حفيد من الدرجة ${distA}`;
      desc = `${personA.first_name} هو حفيد ${personB.first_name} من الجيل ${personA.generation}`;
    }
  } else if (distA === 1 && distB === 1) {
    term = 'أخ شقيق / أخ';
    desc = `${personA.first_name} و ${personB.first_name} إخوة (والدهما المشترك هو ${commonAncestor.first_name})`;
  } else if (distA === 1 && distB === 2) {
    term = 'العم (شقيق الوالد)';
    desc = `${personA.first_name} هو عم ${personB.first_name} (والد ${personB.first_name} شقيق ${personA.first_name})`;
  } else if (distA === 2 && distB === 1) {
    term = 'ابن الأخ';
    desc = `${personA.first_name} هو ابن أخ ${personB.first_name}`;
  } else if (distA === 2 && distB === 2) {
    term = 'أبناء عمومة (الدرجة الأولى)';
    desc = `${personA.first_name} و ${personB.first_name} أبناء عمومة مباشرة (جدهما المشترك هو ${commonAncestor.first_name})`;
  } else if (distA === distB) {
    term = `أبناء عمومة من الدرجة ${distA - 1}`;
    desc = `${personA.first_name} و ${personB.first_name} أبناء عمومة يشتركان في الجد ${commonAncestor.first_name}`;
  } else {
    term = 'صلة قرابة عائلية من فروع آل راضي';
    desc = `يلتقي نسب ${personA.first_name} مع ${personB.first_name} عند الجد الجامع ${commonAncestor.first_name} (${commonAncestor.full_name})`;
  }

  return {
    personA,
    personB,
    commonAncestor,
    relationshipTerm: term,
    relationshipDescription: desc,
    pathA: subPathA,
    pathB: subPathB,
    distance: distA + distB
  };
}

