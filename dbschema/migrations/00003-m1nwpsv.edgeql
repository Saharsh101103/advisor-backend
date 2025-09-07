CREATE MIGRATION m1nwpsvrhxonz5f5dw4rxnqu3q4f4jyhjodakltiif2prwmcoj3npa
    ONTO m1filnxwfmbyjiqza7zfwuttxr2lpgegggfb7xe6nbqezhkjr6dgba
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY password: std::str {
          SET REQUIRED USING (<std::str>'');
      };
  };
};
