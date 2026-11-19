import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialPostgresSchema1794902085795 implements MigrationInterface {
  name = 'InitialPostgresSchema1794902085795';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(`
      CREATE TYPE "users_role_enum" AS ENUM ('USER', 'ADMIN');
      CREATE TYPE "players_preferredfoot_enum" AS ENUM ('LEFT', 'RIGHT', 'BOTH');
      CREATE TYPE "players_salarycurrency_enum" AS ENUM ('EUR', 'USD', 'GBP');

      CREATE TABLE "agents" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "name" character varying(100) NOT NULL,
        CONSTRAINT "PK_agents" PRIMARY KEY ("id")
      );

      CREATE TABLE "leagues" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "name" character varying(100) NOT NULL,
        "logoPath" character varying(255) NOT NULL,
        CONSTRAINT "PK_leagues" PRIMARY KEY ("id")
      );

      CREATE TABLE "owners" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "name" character varying(100) NOT NULL,
        CONSTRAINT "PK_owners" PRIMARY KEY ("id")
      );

      CREATE TABLE "positions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "name" character varying(20) NOT NULL,
        CONSTRAINT "PK_positions" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_positions_name" UNIQUE ("name")
      );

      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "login" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "role" "users_role_enum" NOT NULL DEFAULT 'USER',
        CONSTRAINT "PK_users" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_login" UNIQUE ("login")
      );

      CREATE TABLE "clubs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "name" character varying(100) NOT NULL,
        "logoPath" character varying(255) NOT NULL,
        "owner_id" uuid NOT NULL,
        "league_id" uuid NOT NULL,
        CONSTRAINT "PK_clubs" PRIMARY KEY ("id"),
        CONSTRAINT "FK_clubs_owner" FOREIGN KEY ("owner_id") REFERENCES "owners" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_clubs_league" FOREIGN KEY ("league_id") REFERENCES "leagues" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );

      CREATE TABLE "players" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp(6) without time zone NOT NULL DEFAULT now(),
        "deleted_at" timestamp(6) without time zone,
        "name" character varying(255) NOT NULL,
        "date_of_birth" date NOT NULL,
        "nationality" character varying(100) NOT NULL,
        "preferredFoot" "players_preferredfoot_enum" NOT NULL,
        "salary" integer NOT NULL,
        "salaryCurrency" "players_salarycurrency_enum" NOT NULL,
        "photoPath" character varying(255) NOT NULL,
        "agent_id" uuid,
        "club_id" uuid,
        "position_id" uuid NOT NULL,
        CONSTRAINT "PK_players" PRIMARY KEY ("id"),
        CONSTRAINT "FK_players_agent" FOREIGN KEY ("agent_id") REFERENCES "agents" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_players_club" FOREIGN KEY ("club_id") REFERENCES "clubs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_players_position" FOREIGN KEY ("position_id") REFERENCES "positions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "players";
      DROP TABLE "clubs";
      DROP TABLE "users";
      DROP TABLE "positions";
      DROP TABLE "owners";
      DROP TABLE "leagues";
      DROP TABLE "agents";

      DROP TYPE "players_salarycurrency_enum";
      DROP TYPE "players_preferredfoot_enum";
      DROP TYPE "users_role_enum";
    `);
  }
}
