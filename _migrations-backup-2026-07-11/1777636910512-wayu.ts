import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wayu1777636910512 implements MigrationInterface {
  name = 'Wayu1777636910512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "news_tags_tags" ("newsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_e97690e270ce85391b9a618b769" PRIMARY KEY ("newsId", "tagsId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5e80d8ad318497fa53c54bec42" ON "news_tags_tags" ("newsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_b7058e602e8b589b42790ca19b" ON "news_tags_tags" ("tagsId") `);
    await queryRunner.query(
      `ALTER TABLE "news_tags_tags" ADD CONSTRAINT "FK_5e80d8ad318497fa53c54bec424" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_tags_tags" ADD CONSTRAINT "FK_b7058e602e8b589b42790ca19bb" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news_tags_tags" DROP CONSTRAINT "FK_b7058e602e8b589b42790ca19bb"`);
    await queryRunner.query(`ALTER TABLE "news_tags_tags" DROP CONSTRAINT "FK_5e80d8ad318497fa53c54bec424"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b7058e602e8b589b42790ca19b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5e80d8ad318497fa53c54bec42"`);
    await queryRunner.query(`DROP TABLE "news_tags_tags"`);
  }
}
