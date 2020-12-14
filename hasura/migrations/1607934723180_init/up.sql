CREATE TABLE public.doc_version (
    id integer NOT NULL,
    body text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    wiki_doc_name text,
    version integer
);
CREATE SEQUENCE public.docs_version_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.docs_version_id_seq OWNED BY public.doc_version.id;
CREATE TABLE public.wiki_doc (
    name text NOT NULL
);
ALTER TABLE ONLY public.doc_version ALTER COLUMN id SET DEFAULT nextval('public.docs_version_id_seq'::regclass);
ALTER TABLE ONLY public.doc_version
    ADD CONSTRAINT docs_version_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.wiki_doc
    ADD CONSTRAINT wiki_docs_name_key UNIQUE (name);
ALTER TABLE ONLY public.wiki_doc
    ADD CONSTRAINT wiki_docs_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.doc_version
    ADD CONSTRAINT docs_version_wiki_docs_name_fkey FOREIGN KEY (wiki_doc_name) REFERENCES public.wiki_doc(name) ON UPDATE RESTRICT ON DELETE RESTRICT;
