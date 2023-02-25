// Generated by https://quicktype.io

export interface IGetPostCommentsData {
    kind: Kind;
    data: Data;
}

export interface Data {
    subreddit_id?:                    SubredditID;
    approved_at_utc?:                 null;
    author_is_blocked?:               boolean;
    comment_type?:                    null;
    awarders?:                        any[];
    mod_reason_by?:                   null;
    banned_by?:                       null;
    author_flair_type?:               AuthorFlairType;
    total_awards_received?:           number;
    subreddit?:                       Subreddit;
    author_flair_template_id?:        null;
    likes?:                           null;
    replies?:                         string | IGetPostCommentsData[];
    user_reports?:                    any[];
    saved?:                           boolean;
    id:                               string;
    banned_at_utc?:                   null;
    mod_reason_title?:                null;
    gilded?:                          number;
    archived?:                        boolean;
    collapsed_reason_code?:           null;
    no_follow?:                       boolean;
    author?:                          string;
    can_mod_post?:                    boolean;
    created_utc:                     number;
    send_replies?:                    boolean;
    parent_id:                        string;
    score?:                           number;
    author_fullname?:                 string;
    approved_by?:                     null;
    mod_note?:                        null;
    all_awardings?:                   any[];
    collapsed?:                       boolean;
    body?:                            string;
    edited?:                          boolean;
    top_awarded_type?:                null;
    author_flair_css_class?:          null;
    name:                             string;
    is_submitter?:                    boolean;
    downs?:                           number;
    author_flair_richtext?:           any[];
    author_patreon_flair?:            boolean;
    body_html?:                       string;
    removal_reason?:                  null;
    collapsed_reason?:                null;
    distinguished?:                   null;
    associated_award?:                null;
    stickied?:                        boolean;
    author_premium?:                  boolean;
    can_gild?:                        boolean;
    gildings?:                        Gildings;
    unrepliable_reason?:              null;
    author_flair_text_color?:         null;
    score_hidden?:                    boolean;
    permalink?:                       string;
    subreddit_type?:                  SubredditType;
    locked?:                          boolean;
    report_reasons?:                  null;
    created?:                         number;
    author_flair_text?:               null;
    treatment_tags?:                  any[];
    link_id?:                         LinkID;
    subreddit_name_prefixed?:         SubredditNamePrefixed;
    controversiality?:                number;
    depth:                            number;
    author_flair_background_color?:   null;
    collapsed_because_crowd_control?: null;
    mod_reports?:                     any[];
    num_reports?:                     null;
    ups?:                             number;
    count?:                           number;
    children?:                        string[];
}

export enum AuthorFlairType {
    Text = "text",
}

export interface Gildings {
}

export enum LinkID {
    T3119Mghv = "t3_119mghv",
}

export enum Subreddit {
    Aww = "aww",
}

export enum SubredditID {
    T52Qh1O = "t5_2qh1o",
}

export enum SubredditNamePrefixed {
    RAww = "r/aww",
}

export enum SubredditType {
    Public = "public",
}

export enum Kind {
    More = "more",
    T1 = "t1",
}
