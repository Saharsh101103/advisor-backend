CREATE MIGRATION m1w5hcxdxmdgt4rpjrb5dc7moqv6oql2jt3plnfxwn2pgikdum5z3a
    ONTO m1ga7dabntqdtjvwolclftyyvzld6zwmxeikzogonvkiuuwxtqjj4a
{
  ALTER TYPE default::Enrollment {
      ALTER PROPERTY progress {
          SET default := 0;
          RESET OPTIONALITY;
      };
  };
};
