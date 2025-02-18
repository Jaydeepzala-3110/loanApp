import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteTable1739861494106 implements MigrationInterface {
    name = 'AddNoteTable1739861494106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notes_type_enum" AS ENUM('note', 'sms', 'log')`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "note" text NOT NULL, "type" "public"."notes_type_enum" NOT NULL DEFAULT 'note', "systemGenerated" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "applicationId" uuid, "addedBy" uuid, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_0fe22367a78f25b818fb487f6ed" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_693e0e1b4a9547e9f2e7bfd3032" FOREIGN KEY ("addedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_693e0e1b4a9547e9f2e7bfd3032"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_0fe22367a78f25b818fb487f6ed"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TYPE "public"."notes_type_enum"`);
    }

}
