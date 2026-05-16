const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
function run(cmd) {
    try {
        console.log(`执行命令: ${cmd}`);
        execSync(cmd, { stdio: 'inherit', cwd: root });
        console.log(`✅ 命令执行成功: ${cmd}`);
    } catch (error) {
        console.error(`❌ 命令执行失败: ${cmd}`);
        console.error(`错误信息: ${error.message}`);
        process.exit(1);
    }
}
const requiredEnvVars = ['WEBSTUDIO_LINK', 'DOMAIN', 'FAVICON', 'F404PAGE'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.warn(`⚠️ 警告: 环境变量 ${envVar} 未设置`);
    }
}
if (process.env.WEBSTUDIO_LINK) {
    run('npx webstudio link --link "' + process.env.WEBSTUDIO_LINK + '"');
    console.log('✅ webstudio link 成功');
} else {
    console.warn('⚠️ WEBSTUDIO_LINK 未设置，跳过 webstudio link');
}
run('npx webstudio sync');
run('npx webstudio build --template ssg');
const faviconSrc = path.join(root, 'public', 'assets', process.env.FAVICON || 'favicon.ico');
const faviconDest = path.join(root, 'public', 'favicon.ico');
if (fs.existsSync(faviconSrc)) {
    try {
        fs.copyFileSync(faviconSrc, faviconDest);
        console.log('✅ 复制 favicon 成功');
    } catch (error) {
        console.warn('⚠️ 复制 favicon 失败');
    }
}
const pagesDir = path.join(root, 'pages');
if (fs.existsSync(pagesDir)) {
    try {
        function walk(dir) {
            for (const item of fs.readdirSync(dir)) {
                const itemPath = path.join(dir, item);
                if (fs.statSync(itemPath).isDirectory()) {
                    walk(itemPath);
                } else if (item === '+data.ts') {
                    let content = fs.readFileSync(itemPath, 'utf-8');
                    content = content.replaceAll('//url', '//' + (process.env.DOMAIN || '//url'));
                    fs.writeFileSync(itemPath, content);
                }
            }
        }
        walk(pagesDir);
        console.log('✅ 处理 pages 目录成功');
    } catch (error) {
        console.warn('⚠️ 处理 pages 目录失败');
    }
}
run('npm install');
run('npm run build');
const fourOhFourPage = path.join(root, 'dist', 'client', process.env.F404PAGE || '404/index.html');
const fourOhFourPageDest = path.join(root, 'dist', 'client', '404.html');
if (fs.existsSync(fourOhFourPage)) {
    try {
        fs.copyFileSync(fourOhFourPage, fourOhFourPageDest);
        console.log('✅ 复制 404 页面成功');
    } catch (error) {
        console.warn('⚠️ 复制 404 页面失败');
    }
}