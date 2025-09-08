CREATE MIGRATION m1v3nyokpb2iwnkoug5dcydvsij7smafnzr32ezg5uoe3ajkpjp7pa
    ONTO m146tf6k5xir2mao2lwfndp7nzcnuy4elvmfhub3vwihzlmrh3tkba
{
  ALTER SCALAR TYPE default::EventType EXTENDING enum<CLASS, ADVISING, DEADLINE>;
};
