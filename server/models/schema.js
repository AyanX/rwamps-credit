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

const servicesTable = mysqlTable("services", {
  id: int("id").primaryKey().autoincrement(),
  image: varchar("image", { length: 255 }).notNull(),
  blur_image: varchar("blur_image", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  icon: varchar("icon", { length: 255 }).notNull(),
  points:text("points").notNull(),
  fake_id: varchar("fake_id", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

const messagesTable = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  phone_number: varchar("phone_number", { length: 255 }),
  isRead: boolean("isRead").default(false),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

  // loans_disbursed: 15,
  // loans_disbursed_initials: 'K',
  // repayment_rate: 87,
  // total_disbursed: 12,
  // locations_served: 35,
  // serving_hours: '24/7',
  // serving_days: '7',
  // active_users: 50,
  // active_users_initials: 'K',
  // total_clients: 850,
  // total_clients_initials: '+',

const statsTable = mysqlTable("stats", {
  id: int("id").primaryKey().autoincrement(),
  loans_disbursed: int("loans_disbursed").notNull(),
  loans_disbursed_initials: varchar("loans_disbursed_initials", { length: 255 }).notNull(),
  repayment_rate: int("repayment_rate").notNull(),
  total_disbursed: int("total_disbursed").notNull(),
  locations_served: int("locations_served").notNull(),
  serving_hours: varchar("serving_hours", { length: 255 }).notNull(),
  serving_days: varchar("serving_days", { length: 255 }).notNull(),
  active_users: int("active_users").notNull(),
  active_users_initials: varchar("active_users_initials", { length: 255 }).notNull(),
  total_clients: int("total_clients").notNull(),
  total_clients_initials: varchar("total_clients_initials", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

  // { id: 3, name: 'Grace Akello', bio: ".", 
  // occupation: '', loan_purpose: 'Growth Loan', initials: 'GA', card_color: '#7A2D08' },

const testimoniesTable = mysqlTable("testimonies", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
 bio: text("bio").notNull(),
 occupation: varchar("occupation", { length: 255 }),
 loan_purpose: varchar("loan_purpose", { length: 255 }).notNull(),
 initials: varchar("initials", { length: 255 }).notNull(),
 card_color: varchar("card_color", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})


const partnersTable = mysqlTable("partners", {
  id: int("id").primaryKey().autoincrement(),
  client: varchar("client", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

const whatWeDoTable = mysqlTable("what_we_do", {
  id: int("id").primaryKey().autoincrement(),
  image: varchar("image", { length: 255 }).notNull(),
  blur_image: varchar("blur_image", { length: 255 }),
  fake_id: varchar("fake_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  isDeleted: boolean("isDeleted").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})   

const socialsTable = mysqlTable("socials", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  linkedin: varchar("linkedin", { length: 255 }).notNull(),
  twitter: varchar("twitter", { length: 255 }).notNull(),
  facebook: varchar("facebook", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

const adminEmail = mysqlTable("admin_email" , {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

adminUsername = mysqlTable("admin_username" , {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

adminPassword = mysqlTable("admin_password" , {
  id: int("id").primaryKey().autoincrement(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})

adminPin = mysqlTable("admin_pin" , {
  id: int("id").primaryKey().autoincrement(),
  pin: varchar("pin", { length: 255 }).notNull(),
  token:text("token"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
})


module.exports = {
  adminEmail,
  adminUsername,
  adminPassword,
  adminPin,
  productsTable,
  socialsTable,
  loansTable,
  whatWeDoTable,
  partnersTable,
  servicesTable,
    faqsTable,
    messagesTable,
    testimoniesTable,
    contactBranchesTable,
    statsTable,
    aboutUsTable,
};