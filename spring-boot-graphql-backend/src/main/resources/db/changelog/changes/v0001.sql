create table author (
  id serial not null,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  primary key (id)
);

create table book (
  id serial not null,
  title varchar(100) not null,
  isbn varchar(10) not null,
  page_count int not null,
  author_id integer not null references author(id),
  primary key (id)
);



