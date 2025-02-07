import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMedicareCascade1738911015085 implements MigrationInterface {
    name = 'FixMedicareCascade1738911015085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e134fffcefe19f60750bfc3ab87"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e134fffcefe19f60750bfc3ab87" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e134fffcefe19f60750bfc3ab87"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e134fffcefe19f60750bfc3ab87" FOREIGN KEY ("identity_id") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
