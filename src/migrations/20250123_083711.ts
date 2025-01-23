import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`forms_blocks_upload\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`size\` numeric DEFAULT 5 NOT NULL,
  	\`width\` numeric,
  	\`multiple\` integer DEFAULT false NOT NULL,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_upload_order_idx\` ON \`forms_blocks_upload\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_upload_parent_id_idx\` ON \`forms_blocks_upload\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_upload_path_idx\` ON \`forms_blocks_upload\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_order_idx\` ON \`form_submissions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_parent_idx\` ON \`form_submissions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_path_idx\` ON \`form_submissions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_media_id_idx\` ON \`form_submissions_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_general_taxes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`percentage\` numeric DEFAULT 0 NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_general_taxes_order_idx\` ON \`site_settings_general_taxes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_general_taxes_parent_id_idx\` ON \`site_settings_general_taxes\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`general_discount\` numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`forms_blocks_upload\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_general_taxes\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`general_discount\`;`)
}
