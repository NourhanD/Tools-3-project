-- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE IF NOT EXISTS public."User"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "firstName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "User_email_phoneNumber_key" UNIQUE (email, "phoneNumber")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;
    -- Table: public.Courier

-- DROP TABLE IF EXISTS public."Courier";

CREATE TABLE IF NOT EXISTS public."Courier"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "firstName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Courier_pkey" PRIMARY KEY (id),
    CONSTRAINT "Courier_phoneNumber_email_key" UNIQUE ("phoneNumber", email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Courier"
    OWNER to postgres;
    -- Table: public.Orders

-- DROP TABLE IF EXISTS public."Orders";

CREATE TABLE IF NOT EXISTS public."Orders"
(
    order_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    pickup_loc character varying(300) COLLATE pg_catalog."default" NOT NULL,
    dropoff_loc character varying(300) COLLATE pg_catalog."default" NOT NULL,
    package_details character varying(300) COLLATE pg_catalog."default" NOT NULL,
    delivery_time character varying(100) COLLATE pg_catalog."default" NOT NULL,
    status character varying(100) COLLATE pg_catalog."default" NOT NULL,
    courier_id integer,
    CONSTRAINT "Orders_pkey" PRIMARY KEY (order_id),
    CONSTRAINT "Orders_courier_id_fkey" FOREIGN KEY (courier_id)
        REFERENCES public."Courier" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Orders"
    OWNER to postgres;
    -- Table: public.Assignments

-- DROP TABLE IF EXISTS public."Assignments";

CREATE TABLE IF NOT EXISTS public."Assignments"
(
    assignment_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    order_id integer NOT NULL,
    courier_id integer NOT NULL,
    status character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "AssignedOrder_pkey" PRIMARY KEY (assignment_id),
    CONSTRAINT "AssignedOrder_order_id_fkey" FOREIGN KEY (order_id)
        REFERENCES public."Orders" (order_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Assignments_courier_id_fkey" FOREIGN KEY (courier_id)
        REFERENCES public."Courier" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Assignments"
    OWNER to postgres;
