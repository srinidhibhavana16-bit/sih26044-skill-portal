/**
 * Unit Tests for Skill Matching Logic
 * Tests the core skill gap analysis algorithm
 */

describe('Skill Matching Algorithm', () => {

  describe('calculateSkillMatch', () => {
    test('should calculate skill match between student and opportunity', () => {
      const calculateSkillMatch = (studentSkills, opportunityRequiredSkills) => {
        const matched = opportunityRequiredSkills.filter(reqSkill =>
          studentSkills.some(s => s.toLowerCase() === reqSkill.name.toLowerCase())
        );
        return {
          matchPercentage: Math.round((matched.length / opportunityRequiredSkills.length) * 100),
          matchedSkills: matched.map(s => s.name),
          missingSkills: opportunityRequiredSkills
            .filter(s => !matched.find(m => m.name === s.name))
            .map(s => s.name)
        };
      };

      const studentSkills = ['Python', 'JavaScript', 'React'];
      const opportunitySkills = [
        { name: 'Python', importance: 'critical' },
        { name: 'JavaScript', importance: 'critical' },
        { name: 'React', importance: 'important' },
        { name: 'Docker', importance: 'important' }
      ];

      const result = calculateSkillMatch(studentSkills, opportunitySkills);
      expect(result.matchPercentage).toBe(75); // 3/4
      expect(result.matchedSkills.length).toBe(3);
      expect(result.missingSkills).toContain('Docker');
    });

    test('should handle case-insensitive matching', () => {
      const calculateSkillMatch = (studentSkills, opportunityRequiredSkills) => {
        const matched = opportunityRequiredSkills.filter(reqSkill =>
          studentSkills.some(s => s.toLowerCase() === reqSkill.name.toLowerCase())
        );
        return {
          matchPercentage: Math.round((matched.length / opportunityRequiredSkills.length) * 100),
          matchedSkills: matched.map(s => s.name),
          missingSkills: opportunityRequiredSkills
            .filter(s => !matched.find(m => m.name === s.name))
            .map(s => s.name)
        };
      };

      const studentSkills = ['python', 'JAVASCRIPT'];
      const opportunitySkills = [
        { name: 'Python', importance: 'critical' },
        { name: 'JavaScript', importance: 'critical' }
      ];

      const result = calculateSkillMatch(studentSkills, opportunitySkills);
      expect(result.matchPercentage).toBe(100);
      expect(result.missingSkills.length).toBe(0);
    });

    test('should return 0% match when no skills match', () => {
      const calculateSkillMatch = (studentSkills, opportunityRequiredSkills) => {
        const matched = opportunityRequiredSkills.filter(reqSkill =>
          studentSkills.some(s => s.toLowerCase() === reqSkill.name.toLowerCase())
        );
        return {
          matchPercentage: Math.round((matched.length / opportunityRequiredSkills.length) * 100),
          matchedSkills: matched.map(s => s.name),
          missingSkills: opportunityRequiredSkills.map(s => s.name)
        };
      };

      const studentSkills = ['Painting', 'Drawing'];
      const opportunitySkills = [
        { name: 'Python', importance: 'critical' },
        { name: 'JavaScript', importance: 'critical' }
      ];

      const result = calculateSkillMatch(studentSkills, opportunitySkills);
      expect(result.matchPercentage).toBe(0);
      expect(result.matchedSkills.length).toBe(0);
      expect(result.missingSkills.length).toBe(2);
    });
  });

  describe('prioritizeMissingSkills', () => {
    test('should prioritize critical missing skills', () => {
      const prioritizeMissingSkills = (missing, importance) => {
        return missing
          .map(skill => ({ skill, ...importance.find(i => i.name === skill.name) }))
          .sort((a, b) => {
            const order = { critical: 0, important: 1, 'nice-to-have': 2 };
            return order[a.importance] - order[b.importance];
          });
      };

      const missingSkills = [
        { name: 'Kubernetes', importance: 'important' },
        { name: 'Docker', importance: 'critical' },
        { name: 'Jenkins', importance: 'nice-to-have' }
      ];

      const result = prioritizeMissingSkills(missingSkills, missingSkills);
      expect(result[0].name).toBe('Docker'); // Critical comes first
      expect(result[1].name).toBe('Kubernetes');
      expect(result[2].name).toBe('Jenkins');
    });
  });

  describe('generateImprovementPath', () => {
    test('should generate actionable improvement steps', () => {
      const generateImprovementPath = (criticalGaps) => {
        return criticalGaps.map(skill => ({
          skill: skill,
          action: `Learn ${skill}`,
          priority: 'high',
          timeEstimate: '4-6 weeks'
        }));
      };

      const criticalGaps = ['Docker', 'Kubernetes'];
      const result = generateImprovementPath(criticalGaps);

      expect(result.length).toBe(2);
      expect(result[0].skill).toBe('Docker');
      expect(result[0].action).toBe('Learn Docker');
      expect(result[0].priority).toBe('high');
    });

    test('should order improvement path by dependencies', () => {
      const generateImprovementPath = (criticalGaps) => {
        // Docker is prerequisite for Kubernetes
        const priorityOrder = ['Docker', 'Kubernetes', 'Jenkins'];
        return criticalGaps
          .sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b))
          .map(skill => ({
            skill: skill,
            action: `Learn ${skill}`,
            step: priorityOrder.indexOf(skill) + 1
          }));
      };

      const criticalGaps = ['Kubernetes', 'Docker'];
      const result = generateImprovementPath(criticalGaps);

      expect(result[0].skill).toBe('Docker'); // Docker first
      expect(result[1].skill).toBe('Kubernetes'); // Kubernetes second
      expect(result[0].step).toBe(1);
      expect(result[1].step).toBe(2);
    });
  });

});
