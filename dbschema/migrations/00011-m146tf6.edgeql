CREATE MIGRATION m146tf6k5xir2mao2lwfndp7nzcnuy4elvmfhub3vwihzlmrh3tkba
    ONTO m16xuyu4szrgji2ufi2t6c34dwobezq4vs3sef2bwqw2lzrfsolrrq
{
  ALTER TYPE default::Announcement {
      DROP PROPERTY author;
  };
  ALTER TYPE default::Announcement {
      CREATE REQUIRED LINK author: default::User {
          SET REQUIRED USING (<default::User>{});
      };
  };
};
