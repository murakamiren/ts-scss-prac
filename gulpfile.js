const gulp = require("gulp"); // gulpプラグインの読み込み
const sass = require("gulp-sass")(require("sass")); // Sassをコンパイルするプラグインの読み込み
const typescript = require("gulp-typescript"); //ts compile
const plumber = require("gulp-plumber"); //エラー時の強制終了を防止
const notify = require("gulp-notify"); //エラー発生時にデスクトップ通知する
// const autoprefixer = require("autoprefixer"); //ベンダープレフィックス付与

// style.scssの監視タスクを作成する
gulp.task("scss", function () {
	// ★ style.scssファイルを監視
	return gulp.watch("./src/scss/*.scss", function () {
		// style.scssの更新があった場合の処理

		// style.scssファイルを取得
		return (
			gulp
				.src("./src/scss/*.scss")
				// Sassのコンパイルを実行
				.pipe(
					sass({
						outputStyle: "expanded",
					})
						// Sassのコンパイルエラーを表示
						// (これがないと自動的に止まってしまう)
						.on("error", sass.logError)
				)
				.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
				.pipe(gulp.dest("./css")) // cssフォルダー以下に保存
		);
	});
});

// ts compile
gulp.task("ts", function () {
	return gulp.watch("./src/ts/*.ts", function () {
		return gulp
			.src("./src/ts/*.ts")
			.pipe(typescript())
			.pipe(gulp.dest("./js"))
			.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }));
	});
});

gulp.task("default", gulp.parallel("ts", "scss"));
