import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1784389482633 implements MigrationInterface {
    name = 'Wayu1784389482633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "email" character varying(64)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "email"`);
    }

}
