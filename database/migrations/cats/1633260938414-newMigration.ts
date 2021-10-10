import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigration1633260938414 implements MigrationInterface {
    name = 'newMigration1633260938414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cats" (
                "id" character varying NOT NULL,
                "userId" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_611e3c0a930b4ddc1541422864c" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "cats"
        `);
    }

}
