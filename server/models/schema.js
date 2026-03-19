const { is } = require("drizzle-orm");
const {
  mysqlTable,
  int,
  varchar,
  boolean,
  text,
  timestamp,
} = require("drizzle-orm/mysql-core");

const productsTable= mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  bg_color: varchar("bg_color", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
  points:text("points").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

const loansTable = mysqlTable("loans", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    sub_title: varchar("sub_title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    card_one_title: varchar("card_one_title", { length: 255 }).notNull(),
    card_one_content: text("card_one_content").notNull(),
    card_one_loan_amount_start: varchar("card_one_loan_amount_start", { length: 255 }).notNull(),
    card_one_loan_amount_end: varchar("card_one_loan_amount_end", { length: 255 }).notNull(),
    card_one_duration_start: varchar("card_one_duration_start", { length: 255 }).notNull(),
    card_one_duration_end: varchar("card_one_duration_end", { length: 255 }).notNull(),
    card_one_eligibility: text("card_one_eligibility").notNull(),
    card_one_bg_color: varchar("card_one_bg_color", { length: 255 }).notNull(),
    card_one_text_color: varchar("card_one_text_color", { length: 255 }).notNull(),
    card_two_title: varchar("card_two_title", { length: 255 }).notNull(),
    card_two_content: text("card_two_content").notNull(),
    card_two_loan_amount_start: varchar("card_two_loan_amount_start", { length: 255 }).notNull(),
    card_two_loan_amount_end: varchar("card_two_loan_amount_end", { length: 255 }).notNull(),
    card_two_duration_start: varchar("card_two_duration_start", { length: 255 }).notNull(),
    card_two_duration_end: varchar("card_two_duration_end", { length: 255 }).notNull(),
    card_two_eligibility: text("card_two_eligibility").notNull(),
    card_two_bg_color: varchar("card_two_bg_color", { length: 255 }).notNull(),
    card_two_text_color: varchar("card_two_text_color", { length: 255 }).notNull(),
    isDeleted: boolean("isDeleted").default(false),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

const faqsTable = mysqlTable("faqs", {
  id: int("id").primaryKey().autoincrement(),
  content: text("content").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  isDeleted: boolean("isDeleted").default(false),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});


const contactBranchesTable = mysqlTable("contact_branches", {
  id: int("id").primaryKey().autoincrement(),
  branch_name: varchar("branch_name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  website: varchar("website", { length: 255 }).notNull(),
  open_time: varchar("open_time", { length: 255 }).notNull(),
  close_time: varchar("close_time", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

const aboutUsTable = mysqlTable("about_us", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  bg_color: varchar("bg_color", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

module.exports = {
  productsTable,
  loansTable,
    faqsTable,
    contactBranchesTable,
    aboutUsTable,
};