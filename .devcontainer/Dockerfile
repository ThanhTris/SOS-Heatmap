# Sử dụng Go 1.21 (Bản ổn định cho Backend)
FROM mcr.microsoft.com/devcontainers/go:1-1.21-bullseye

# Cài đặt Node.js 20 (LTS) - Bắt buộc cho Next.js 14+ chạy ngon
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Cài đặt PostgreSQL Client (Để debug kết nối ZeroTier nếu cần)
RUN apt-get update && apt-get install -y postgresql-client

# Dọn dẹp rác sau khi cài đặt cho nhẹ máy
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# (Lưu ý: Không COPY go.mod hay package.json ở đây
# Vì DevContainer sẽ mount thư mục code vào sau khi container chạy)