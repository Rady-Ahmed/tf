-- AL RADY FAMILY LEGACY — Initial Seed Data
-- 100% data preservation of all 73 individuals and tree hierarchy

-- Branches
INSERT INTO family_branches (code, name, description, color, sort_order)
VALUES
  ('abdel-samad', 'فرع عبدالصمد', 'فرع الشيخ عبدالصمد بن راضي، تولى أبناؤه العمودية والمشيخة', '#047857', 1),
  ('hamad', 'فرع حمد', 'فرع حمد بن راضي', '#b45309', 2),
  ('waqqad', 'فرع وقاد', 'فرع وقاد بن راضي', '#1d4ed8', 3)
ON CONFLICT (code) DO NOTHING;

-- Insert Persons Step 1: Insert all without father_id to satisfy FK
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('w5n4zuk', 'راضي', 'راضي', 1, 'الأصل المؤسس', true, 'شارونة، المنيا، مصر', 'عمودية ومشيخة وتجارة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('l83lnvs', 'عبدالصمد', 'عبدالصمد بن راضي', 2, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'عمودية ومشيخة وتجارة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('p8mojns', 'علي', 'علي بن عبدالصمد بن راضي', 3, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'عمودية ومشيخة وتجارة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('rp3ca11', 'عبدالصمد', 'عبدالصمد بن علي بن عبدالصمد بن راضي', 4, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('yndlsys', 'علي', 'علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('6v3j6h2', 'عبدالصمد', 'عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('m6mmhgl', 'علي', 'علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('rdbypnr', 'نشئت', 'نشئت بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، نشئت بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('vntid7g', 'حسن', 'حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('qhadlmy', 'محمد', 'محمد بن حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('xbytbd3', 'راضي', 'راضي بن حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، راضي بن حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('ihtcbl8', 'علي', 'علي بن حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن حسن بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('33t89a6', 'عبدالصمد', 'عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('1celtaq', 'علي', 'علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('d1c2ht0', 'عبدالصمد', 'عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 10, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('jqworhn', 'مجدي', 'مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 10, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('y4zrwyo', 'احمد', 'احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 10, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('duskyfc', 'مكه', 'مكه بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 10, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، مكه بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('3jj4jr9', 'عبدالحليم', 'عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('4902ogg', 'علي', 'علي بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 10, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('xwowl4m', 'اروي', 'اروي بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 10, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، اروي بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('gqcase1', 'احمد', 'احمد بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('nm3ddhc', 'محمد', 'محمد بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('qi0any7', 'احمد', 'احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('v58yj73', 'راضي', 'راضي بن احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، راضي بن احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('yoauijh', 'علي', 'علي بن احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('pyou3yd', 'مجدي', 'مجدي بن احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، مجدي بن احمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('mcijm5u', 'مجدي', 'مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('2jbmirq', 'احمد', 'احمد بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('0q95na5', 'محمد', 'محمد بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('3qohfbr', 'ريان', 'ريان بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، ريان بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('fnrqzcr', 'يونس', 'يونس بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 9, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، يونس بن مجدي بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('tsw1vvr', 'امل', 'امل بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، امل بن علي بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('m9uug4b', 'عبدالحليم', 'عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('coy4qqk', 'محمود', 'محمود بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمود بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('ov3thyy', 'عبدالصمد', 'عبدالصمد بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('r8fz1bw', 'علي', 'علي بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، علي بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('jtnrrxx', 'محمد', 'محمد بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('f8btdcd', 'دياب', 'دياب بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، دياب بن عبدالحليم بن عبدالصمد بن علي بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('j3ais6y', 'السيد', 'السيد بن عبدالصمد بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، السيد بن عبدالصمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('5xut454', 'أحمد', 'أحمد بن علي بن عبدالصمد بن راضي', 4, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('fsw1htr', 'خالد', 'خالد بن أحمد بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('ewlbf0p', 'احمد', 'احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('98x8udc', 'سيد', 'سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('vguhsu3', 'طه', 'طه بن سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، طه بن سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('jj383lp', 'حسام', 'حسام بن سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، حسام بن سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('iuv3a5f', 'محمد', 'محمد بن سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 8, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن سيد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('d386oxt', 'محمد', 'محمد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('jhtggpm', 'خالد', 'خالد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، خالد بن احمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('o1cbnio', 'محمد', 'محمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('lv04509', 'عبدالصمد', 'عبدالصمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('smrfe14', 'حسام', 'حسام بن عبدالصمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، حسام بن عبدالصمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('15bsbbr', 'محمد', 'محمد بن عبدالصمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن عبدالصمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('v9p4r3u', 'محمود', 'محمود بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمود بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('kaub7or', 'معتمد', 'معتمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، معتمد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('r62h9a8', 'وليد', 'وليد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، وليد بن خالد بن أحمد بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('kmnh4pg', 'راضي', 'راضي بن علي بن عبدالصمد بن راضي', 4, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، راضي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('8a55h08', 'مرسي', 'مرسي بن علي بن عبدالصمد بن راضي', 4, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('s3ka6bs', 'محمد', 'محمد بن مرسي بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('zxdcgxl', 'صلاح', 'صلاح بن محمد بن مرسي بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، صلاح بن محمد بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('5asw6qi', 'عبدالوهاب', 'عبدالوهاب بن مرسي بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عبدالوهاب بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('lipch0w', 'حسن', 'حسن بن مرسي بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، حسن بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('vts3bfi', 'عاشور', 'عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('axjruzz', 'احمد', 'احمد بن عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('apcvn4z', 'محمد', 'محمد بن عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمد بن عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('hybl4wl', 'عمر', 'عمر بن عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي', 7, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، عمر بن عاشور بن حسن بن مرسي بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('ykgswov', 'إبراهيم', 'إبراهيم بن علي بن عبدالصمد بن راضي', 4, 'فرع عبدالصمد', true, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، إبراهيم بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('2f3j3gx', 'حمدي', 'حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي', 5, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('x1ucze8', 'محمود', 'محمود بن حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، محمود بن حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('mq6zkj8', 'احمد', 'احمد بن حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، احمد بن حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('fdwacd6', 'ابراهيم', 'ابراهيم بن حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي', 6, 'فرع عبدالصمد', false, 'شارونة، المنيا، مصر', 'أعمال حرة وتعليم وهندسة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، ابراهيم بن حمدي بن إبراهيم بن علي بن عبدالصمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('szykbho', 'حمد', 'حمد بن راضي', 2, 'فرع حمد', true, 'شارونة، المنيا، مصر', 'عمودية ومشيخة وتجارة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، حمد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;
INSERT INTO persons (legacy_id, first_name, full_name, generation, branch_name, is_deceased, residence, occupation, verification_status, bio)
VALUES ('s0cq9gq', 'وقاد', 'وقاد بن راضي', 2, 'فرع وقاد', true, 'شارونة، المنيا، مصر', 'عمودية ومشيخة وتجارة', 'verified', 'من أبناء عائلة آل راضي بقرية شارونة، وقاد بن راضي.')
ON CONFLICT (legacy_id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  full_name = EXCLUDED.full_name,
  generation = EXCLUDED.generation,
  branch_name = EXCLUDED.branch_name,
  is_deceased = EXCLUDED.is_deceased;

-- Insert Persons Step 2: Update father_id and branch_id using legacy_id mappings
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'w5n4zuk') WHERE legacy_id = 'l83lnvs';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'l83lnvs';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'l83lnvs') WHERE legacy_id = 'p8mojns';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'p8mojns';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'p8mojns') WHERE legacy_id = 'rp3ca11';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'rp3ca11';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'rp3ca11') WHERE legacy_id = 'yndlsys';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'yndlsys';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'yndlsys') WHERE legacy_id = '6v3j6h2';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '6v3j6h2';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '6v3j6h2') WHERE legacy_id = 'm6mmhgl';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'm6mmhgl';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm6mmhgl') WHERE legacy_id = 'rdbypnr';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'rdbypnr';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm6mmhgl') WHERE legacy_id = 'vntid7g';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'vntid7g';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'vntid7g') WHERE legacy_id = 'qhadlmy';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'qhadlmy';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'vntid7g') WHERE legacy_id = 'xbytbd3';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'xbytbd3';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'vntid7g') WHERE legacy_id = 'ihtcbl8';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'ihtcbl8';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm6mmhgl') WHERE legacy_id = '33t89a6';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '33t89a6';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '33t89a6') WHERE legacy_id = '1celtaq';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '1celtaq';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '1celtaq') WHERE legacy_id = 'd1c2ht0';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'd1c2ht0';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '1celtaq') WHERE legacy_id = 'jqworhn';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'jqworhn';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '1celtaq') WHERE legacy_id = 'y4zrwyo';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'y4zrwyo';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '1celtaq') WHERE legacy_id = 'duskyfc';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'duskyfc';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '33t89a6') WHERE legacy_id = '3jj4jr9';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '3jj4jr9';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '3jj4jr9') WHERE legacy_id = '4902ogg';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '4902ogg';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '3jj4jr9') WHERE legacy_id = 'xwowl4m';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'xwowl4m';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '33t89a6') WHERE legacy_id = 'gqcase1';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'gqcase1';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '33t89a6') WHERE legacy_id = 'nm3ddhc';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'nm3ddhc';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm6mmhgl') WHERE legacy_id = 'qi0any7';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'qi0any7';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'qi0any7') WHERE legacy_id = 'v58yj73';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'v58yj73';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'qi0any7') WHERE legacy_id = 'yoauijh';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'yoauijh';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'qi0any7') WHERE legacy_id = 'pyou3yd';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'pyou3yd';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm6mmhgl') WHERE legacy_id = 'mcijm5u';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'mcijm5u';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'mcijm5u') WHERE legacy_id = '2jbmirq';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '2jbmirq';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'mcijm5u') WHERE legacy_id = '0q95na5';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '0q95na5';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'mcijm5u') WHERE legacy_id = '3qohfbr';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '3qohfbr';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'mcijm5u') WHERE legacy_id = 'fnrqzcr';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'fnrqzcr';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm6mmhgl') WHERE legacy_id = 'tsw1vvr';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'tsw1vvr';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '6v3j6h2') WHERE legacy_id = 'm9uug4b';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'm9uug4b';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm9uug4b') WHERE legacy_id = 'coy4qqk';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'coy4qqk';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm9uug4b') WHERE legacy_id = 'ov3thyy';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'ov3thyy';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm9uug4b') WHERE legacy_id = 'r8fz1bw';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'r8fz1bw';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm9uug4b') WHERE legacy_id = 'jtnrrxx';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'jtnrrxx';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'm9uug4b') WHERE legacy_id = 'f8btdcd';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'f8btdcd';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'rp3ca11') WHERE legacy_id = 'j3ais6y';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'j3ais6y';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'p8mojns') WHERE legacy_id = '5xut454';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '5xut454';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '5xut454') WHERE legacy_id = 'fsw1htr';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'fsw1htr';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'fsw1htr') WHERE legacy_id = 'ewlbf0p';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'ewlbf0p';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'ewlbf0p') WHERE legacy_id = '98x8udc';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '98x8udc';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '98x8udc') WHERE legacy_id = 'vguhsu3';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'vguhsu3';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '98x8udc') WHERE legacy_id = 'jj383lp';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'jj383lp';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '98x8udc') WHERE legacy_id = 'iuv3a5f';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'iuv3a5f';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'ewlbf0p') WHERE legacy_id = 'd386oxt';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'd386oxt';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'ewlbf0p') WHERE legacy_id = 'jhtggpm';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'jhtggpm';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'fsw1htr') WHERE legacy_id = 'o1cbnio';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'o1cbnio';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'fsw1htr') WHERE legacy_id = 'lv04509';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'lv04509';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'lv04509') WHERE legacy_id = 'smrfe14';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'smrfe14';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'lv04509') WHERE legacy_id = '15bsbbr';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '15bsbbr';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'fsw1htr') WHERE legacy_id = 'v9p4r3u';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'v9p4r3u';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'fsw1htr') WHERE legacy_id = 'kaub7or';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'kaub7or';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'fsw1htr') WHERE legacy_id = 'r62h9a8';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'r62h9a8';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'p8mojns') WHERE legacy_id = 'kmnh4pg';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'kmnh4pg';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'p8mojns') WHERE legacy_id = '8a55h08';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '8a55h08';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '8a55h08') WHERE legacy_id = 's3ka6bs';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 's3ka6bs';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 's3ka6bs') WHERE legacy_id = 'zxdcgxl';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'zxdcgxl';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '8a55h08') WHERE legacy_id = '5asw6qi';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '5asw6qi';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '8a55h08') WHERE legacy_id = 'lipch0w';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'lipch0w';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'lipch0w') WHERE legacy_id = 'vts3bfi';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'vts3bfi';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'vts3bfi') WHERE legacy_id = 'axjruzz';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'axjruzz';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'vts3bfi') WHERE legacy_id = 'apcvn4z';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'apcvn4z';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'vts3bfi') WHERE legacy_id = 'hybl4wl';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'hybl4wl';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'p8mojns') WHERE legacy_id = 'ykgswov';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'ykgswov';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'ykgswov') WHERE legacy_id = '2f3j3gx';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = '2f3j3gx';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '2f3j3gx') WHERE legacy_id = 'x1ucze8';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'x1ucze8';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '2f3j3gx') WHERE legacy_id = 'mq6zkj8';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'mq6zkj8';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = '2f3j3gx') WHERE legacy_id = 'fdwacd6';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'abdel-samad') WHERE legacy_id = 'fdwacd6';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'w5n4zuk') WHERE legacy_id = 'szykbho';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'hamad') WHERE legacy_id = 'szykbho';
UPDATE persons SET father_id = (SELECT id FROM persons WHERE legacy_id = 'w5n4zuk') WHERE legacy_id = 's0cq9gq';
UPDATE persons SET branch_id = (SELECT id FROM family_branches WHERE code = 'waqqad') WHERE legacy_id = 's0cq9gq';
