set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."favoritesList" (
	"petId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "favoritesList_pk" PRIMARY KEY ("petId","userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" text NOT NULL UNIQUE,
	"hashedPassword" text NOT NULL,
	"joinedAt" timestamptz NOT NULL default now(),
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."petDetails" (
	"petId" serial NOT NULL,
	"photos" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"age" TEXT NOT NULL,
	"breed" TEXT NOT NULL,
	"size" TEXT NOT NULL,
	"gender" TEXT NOT NULL,
  CONSTRAINT "petDetails_pk" PRIMARY KEY ("petId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "favoritesList" ADD CONSTRAINT "favoritesList_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "favoritesList" ADD CONSTRAINT "favoritesList_fk1" FOREIGN KEY ("petId") REFERENCES "petDetails"("petId");
ALTER TABLE "favoritesList" ADD CONSTRAINT "favoritesList_fk2" FOREIGN KEY ("petId") REFERENCES "pets"("petId");
