import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1784386496067 implements MigrationInterface {
    name = 'Wayu1784386496067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instagram-posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying(256) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_2e56f8c1f5d2d8c48fe8a5d5dbe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "instagram-posts"`);
    }

}
