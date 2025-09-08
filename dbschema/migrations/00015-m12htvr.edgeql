CREATE MIGRATION m12htvrqwlrpuquo7e7uqacuu2u6hykrlgn4dmq4dadcz6f4qxsg4q
    ONTO m1n3wrceeskkg6njw24b4gppmrzuyqtq47ynepczlwr3sweanvmewq
{
  ALTER TYPE default::RequirementCategory {
      ALTER LINK courses {
          RESET EXPRESSION;
          RESET EXPRESSION;
          RESET OPTIONALITY;
          SET TYPE default::CourseRequirement;
      };
  };
};
