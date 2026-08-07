import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wayu1777638541423 implements MigrationInterface {
  name = 'Wayu1777638541423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "faqs_tags_tags" ("faqsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_8a8f0bf7532fe370ca672d88b62" PRIMARY KEY ("faqsId", "tagsId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_7780c8facc8384c63d1284a0dd" ON "faqs_tags_tags" ("faqsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_f48f7c7e9fe291de1c029b2dd5" ON "faqs_tags_tags" ("tagsId") `);
    await queryRunner.query(
      `ALTER TABLE "faqs_tags_tags" ADD CONSTRAINT "FK_7780c8facc8384c63d1284a0dd9" FOREIGN KEY ("faqsId") REFERENCES "faqs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "faqs_tags_tags" ADD CONSTRAINT "FK_f48f7c7e9fe291de1c029b2dd57" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "faqs_tags_tags" DROP CONSTRAINT "FK_f48f7c7e9fe291de1c029b2dd57"`);
    await queryRunner.query(`ALTER TABLE "faqs_tags_tags" DROP CONSTRAINT "FK_7780c8facc8384c63d1284a0dd9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f48f7c7e9fe291de1c029b2dd5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7780c8facc8384c63d1284a0dd"`);
    await queryRunner.query(`DROP TABLE "faqs_tags_tags"`);
  }
}
