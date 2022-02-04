use axum::{
    routing::{post},
    http::StatusCode,
    response::IntoResponse,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/sort_array", post(sort_array));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3003));
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn sort_array(
    Json(mut payload): Json<ArrayData>,
) -> impl IntoResponse {
    payload.data.sort();
    (StatusCode::OK, Json(payload))
}

#[derive(Deserialize,Serialize)]
struct ArrayData {
    data: Vec<i64>,
}
