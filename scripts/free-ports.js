import { execSync } from 'node:child_process';

const PORTS = [3000, 3001, 3002, 3003, 3004, 5173];

function collectPidsForPort(port) {
  try {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf-8'
    });

    const pids = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split(/\s+/).pop())
      .filter((pid) => /^\d+$/.test(pid));

    return [...new Set(pids)];
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    execSync(`taskkill /F /PID ${pid}`, { stdio: ['ignore', 'ignore', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

for (const port of PORTS) {
  const pids = collectPidsForPort(port);

  if (pids.length === 0) {
    continue;
  }

  for (const pid of pids) {
    const killed = killPid(pid);
    if (killed) {
      console.log(`Freed port ${port} by terminating PID ${pid}`);
    }
  }
}
