use axum_extra::extract::{cookie::Cookie, CookieJar};

const REFRESH_EXPIRES_AT: i64 = 7;

pub fn create_refresh_token_cookie(jar: CookieJar, token: &str) -> CookieJar {
    let expires = time::OffsetDateTime::now_utc() + time::Duration::days(REFRESH_EXPIRES_AT);
    let max_age = time::Duration::days(REFRESH_EXPIRES_AT);

    let refresh_cookie = Cookie::build(("refreshToken", token.to_string()))
        .path("/")
        .secure(true)
        .http_only(true)
        .max_age(max_age)
        .expires(expires)
        .build();

    let jar = jar.add(refresh_cookie);

    jar
}

pub fn clear_refresh_token_cookie(jar: CookieJar) -> CookieJar {
    let max_age = time::Duration::seconds(0);

    let refresh_cookie = Cookie::build(("refreshToken", ""))
        .path("/")
        .http_only(true)
        .secure(true)
        .max_age(max_age)
        .build();

    let jar = jar.add(refresh_cookie);

    jar
}
