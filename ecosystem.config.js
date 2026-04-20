const Bots = [
  {
      name: "Token",
      namespace: "Token",
      script: "server.ts",
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./",
      interpreter: "node",
      interpreter_args: "--import tsx",
    },
];

module.exports = {
  apps: Bots
};
