CREATE MIGRATION m1uajlmvcs3omzg7qctdjvk3c62wxsk2ohsinx4mf25yvg2cx3gbnq
    ONTO m1nwpsvrhxonz5f5dw4rxnqu3q4f4jyhjodakltiif2prwmcoj3npa
{
  CREATE TYPE default::Course EXTENDING default::Object {
      CREATE MULTI LINK prerequisites: default::Course;
      CREATE REQUIRED PROPERTY code: std::str;
      CREATE REQUIRED PROPERTY credits: std::int16;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY serial_id: default::SerialId;
      CREATE REQUIRED PROPERTY title: std::str;
  };
};
