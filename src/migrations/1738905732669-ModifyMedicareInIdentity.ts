import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyMedicareInIdentity1738905732669 implements MigrationInterface {
    name = 'ModifyMedicareInIdentity1738905732669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" DROP CONSTRAINT "FK_eb3ef4b76c378c4da9f78de82e6"`);
        await queryRunner.query(`ALTER TABLE "identity" ADD CONSTRAINT "FK_eb3ef4b76c378c4da9f78de82e6" FOREIGN KEY ("medicare_id") REFERENCES "medicare"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "identity" DROP CONSTRAINT "FK_eb3ef4b76c378c4da9f78de82e6"`);
        await queryRunner.query(`ALTER TABLE "identity" ADD CONSTRAINT "FK_eb3ef4b76c378c4da9f78de82e6" FOREIGN KEY ("medicare_id") REFERENCES "driving_license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
