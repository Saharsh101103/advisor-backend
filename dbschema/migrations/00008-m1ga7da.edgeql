CREATE MIGRATION m1ga7dabntqdtjvwolclftyyvzld6zwmxeikzogonvkiuuwxtqjj4a
    ONTO m1m3atrpnc54ldqxpvnndiciylrkl2yjr4uxjt5qlmbd6kemqpdckq
{
  ALTER TYPE default::Enrollment {
      ALTER PROPERTY status {
          SET default := 'UPCOMING';
      };
  };
};
