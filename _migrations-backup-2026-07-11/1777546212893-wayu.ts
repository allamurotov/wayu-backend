import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wayu1777546212893 implements MigrationInterface {
  name = 'Wayu1777546212893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
    await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "countryId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
    await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "countryId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
