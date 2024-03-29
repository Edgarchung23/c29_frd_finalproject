     with details as (
        select logistic_id, json_agg(donate_items.item_name ||  ' X '  || logistic_items.qty) as details from logistic_items 
        inner join  donate_items on donate_items.id = logistic_items.donate_item_id
        group by logistic_id
      ),
       items as (
        select logistic_id from logistic_items group by logistic_items.logistic_id
      )
      select details.logistic_id, details.details ,
      l.contact_name as name
  , l.contact_number as number
      ,l.room || ', ' || l.building ||  ', ' || l.street ||  ', ' || l.district as address,
      l.uuid as uuid
      , l.purpose as purpose
       , l.confirmed_date as confirmed_date
    , l.confirmed_session as confirmed_session
    , u.email as email
       from items 
       left join details on details.logistic_id = items.logistic_id
       inner join logistics l on l.id = items.logistic_id
        inner join users u on u.id = l.user_id




select * from checkins;

with checkin_record as (
   Select donate_item_id, count(donate_item_id) from checkins where order_status != 'checkout'  group by donate_item_id
) select checkin_record.*,  donate_items.item_name, donate_items.deposit_charge,donate_items.rent_charge  from checkin_record  inner join  donate_items on donate_items.id = checkin_record.donate_item_id;