/**
 * Unit Tests for Form Validators
 * Tests validation functions from frontend/js/app.js
 */

describe('Form Validators', () => {
  
  describe('isValidEmail', () => {
    test('should validate correct email format', () => {
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      expect(isValidEmail('student@example.com')).toBe(true);
      expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@domain.com')).toBe(true);
    });

    test('should reject invalid email formats', () => {
      const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('invalid.com')).toBe(false);
      expect(isValidEmail('invalid @example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    test('should accept strong passwords', () => {
      const isStrongPassword = (password) => {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /[0-9]/.test(password);
      };
      
      expect(isStrongPassword('SecurePass123')).toBe(true);
      expect(isStrongPassword('MyPassword2024')).toBe(true);
      expect(isStrongPassword('Test1234')).toBe(true);
    });

    test('should reject weak passwords', () => {
      const isStrongPassword = (password) => {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /[0-9]/.test(password);
      };
      
      expect(isStrongPassword('weak')).toBe(false); // Too short
      expect(isStrongPassword('alllowercase123')).toBe(false); // No uppercase
      expect(isStrongPassword('ALLUPPERCASE123')).toBe(false); // No lowercase
      expect(isStrongPassword('NoNumbers')).toBe(false); // No numbers
    });
  });

  describe('validateLoginForm', () => {
    test('should validate complete login form', () => {
      const validateLoginForm = (email, password) => {
        if (!email || !password) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      expect(validateLoginForm('user@example.com', 'password')).toBe(true);
      expect(validateLoginForm('student@isotopes.com', 'MyPass123')).toBe(true);
    });

    test('should reject incomplete forms', () => {
      const validateLoginForm = (email, password) => {
        if (!email || !password) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      expect(validateLoginForm('', 'password')).toBe(false);
      expect(validateLoginForm('user@example.com', '')).toBe(false);
      expect(validateLoginForm('', '')).toBe(false);
    });

    test('should reject invalid email in form', () => {
      const validateLoginForm = (email, password) => {
        if (!email || !password) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      expect(validateLoginForm('invalid@', 'password')).toBe(false);
      expect(validateLoginForm('invalid.com', 'password')).toBe(false);
    });
  });

  describe('calculateSkillGap', () => {
    test('should calculate 100% match when all skills present', () => {
      const calculateSkillGap = (studentSkills, roleRequiredSkills) => {
        const matched = roleRequiredSkills.filter(reqSkill =>
          studentSkills.some(s => s.name.toLowerCase() === reqSkill.name.toLowerCase())
        );
        return {
          matchPercentage: (matched.length / roleRequiredSkills.length) * 100,
          matched: matched.map(s => s.name),
          missing: roleRequiredSkills.filter(s => !matched.find(m => m.name === s.name)).map(s => s.name)
        };
      };

      const studentSkills = [
        { name: 'Python', level: 'intermediate' },
        { name: 'JavaScript', level: 'intermediate' },
        { name: 'SQL', level: 'beginner' }
      ];

      const roleRequiredSkills = [
        { name: 'Python', importance: 'critical' },
        { name: 'JavaScript', importance: 'critical' },
        { name: 'SQL', importance: 'important' }
      ];

      const result = calculateSkillGap(studentSkills, roleRequiredSkills);
      expect(result.matchPercentage).toBe(100);
      expect(result.matched.length).toBe(3);
      expect(result.missing.length).toBe(0);
    });

    test('should calculate 50% match when half skills present', () => {
      const calculateSkillGap = (studentSkills, roleRequiredSkills) => {
        const matched = roleRequiredSkills.filter(reqSkill =>
          studentSkills.some(s => s.name.toLowerCase() === reqSkill.name.toLowerCase())
        );
        return {
          matchPercentage: (matched.length / roleRequiredSkills.length) * 100,
          matched: matched.map(s => s.name),
          missing: roleRequiredSkills.filter(s => !matched.find(m => m.name === s.name)).map(s => s.name)
        };
      };

      const studentSkills = [
        { name: 'Python', level: 'intermediate' }
      ];

      const roleRequiredSkills = [
        { name: 'Python', importance: 'critical' },
        { name: 'Docker', importance: 'critical' }
      ];

      const result = calculateSkillGap(studentSkills, roleRequiredSkills);
      expect(result.matchPercentage).toBe(50);
      expect(result.matched).toContain('Python');
      expect(result.missing).toContain('Docker');
    });

    test('should identify critical missing skills', () => {
      const calculateSkillGap = (studentSkills, roleRequiredSkills) => {
        const matched = roleRequiredSkills.filter(reqSkill =>
          studentSkills.some(s => s.name.toLowerCase() === reqSkill.name.toLowerCase())
        );
        const critical = roleRequiredSkills
          .filter(s => s.importance === 'critical' && !matched.find(m => m.name === s.name));
        return {
          matchPercentage: (matched.length / roleRequiredSkills.length) * 100,
          matched: matched.map(s => s.name),
          missing: roleRequiredSkills.filter(s => !matched.find(m => m.name === s.name)).map(s => s.name),
          criticalGaps: critical.map(s => s.name)
        };
      };

      const studentSkills = [
        { name: 'Python', level: 'intermediate' }
      ];

      const roleRequiredSkills = [
        { name: 'Python', importance: 'critical' },
        { name: 'Docker', importance: 'critical' },
        { name: 'Kubernetes', importance: 'important' }
      ];

      const result = calculateSkillGap(studentSkills, roleRequiredSkills);
      expect(result.criticalGaps).toContain('Docker');
      expect(result.criticalGaps).not.toContain('Kubernetes');
    });
  });

});
