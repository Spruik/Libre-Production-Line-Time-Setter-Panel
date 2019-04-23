# smart-factory-prod-line-time-setter-panel
Custom Table Plugin that enables users to update the daily production start time for each production line

## PostgresDB Query example: 

SELECT distinct site, area, production_line, start_time FROM  equipment where area is not null and production_line is not null order by site asc, area asc, production_line desc

## Data format
Data MUST be formatted as a TABLE !
