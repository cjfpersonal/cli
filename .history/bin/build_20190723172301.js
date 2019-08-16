#!/usr/bin/env node


const program = require("commander");
// const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const { exec } = require('child_process');
const { gitUrl } = require("./config.js");
/**
 * 配置commander的使用方法
 */
program
  .version("0.1.0")
  // .option("-i, init [name]", "初始化name项目")
  .parse(process.argv);

/**
 * 定义commander的help方法
 */
program.on("--help", () => {
  console.log();
  console.log("Examples:");
  console.log(chalk.gray("  # create a new project with an official template"));
  console.log("  $ haizhi-cli <my-project>");
  console.log();
});

if (program.args) {
  console.log(program.args[0])
  // if (!gitUrl[program.init]) {
  //   // console.error(chalk.redBright("error: 暂不支持此项目"));
  //   console.info("当前仅支持: -i, init " + chalk.blueBright("[gap、gp、sys]"));
  //   return;
  // }
  let cloneOption = 'git clone http://chenjianfeng:chenjianfeng@git.sz.haizhi.com/product/gp/gp-data.git ' + program.args[0]
  const spinner = ora('正在初始项目中').start();
  console.log();
  exec(cloneOption, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.redBright("error: " + error));
      spinner.fail('初始项目失败').stop()
      return;
    }
    spinner.succeed('初始项目完成').stop()
  });
}

// 帮助
function help() {
  program.parse(process.argv);
  return !program.args.length && program.help(); //如果没有输入参数，终端显示帮助
}
help();
