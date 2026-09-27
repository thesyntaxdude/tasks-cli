# tasks-cli

`tasks-cli` is a small interactive task manager for the terminal. It stores
tasks in MongoDB and lets you create, view, update, and remove tasks by using
short commands or aliases.

## Requirements

- Node.js with ES module support
- MongoDB, either a local instance or MongoDB Atlas

## Installation

From this directory:

```bash
npm install
```

Create a `.env` file next to `package.json` and add your MongoDB connection
string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

For a local MongoDB database, use a URI such as:

```env
MONGODB_URI=mongodb://localhost:27017/tasks
```

The application exits if `MONGODB_URI` is missing or if it cannot connect to
MongoDB.

## Running the CLI

Run commands directly with Node:

```bash
node commands.js
node commands.js add
node commands.js list-wip
```

You can also make the package's `tasks-cli` executable available globally from
the project directory:

```bash
npm link
tasks-cli
```

The CLI is interactive. Commands that create or change a task ask for the
required values in the terminal.

## Commands

### List all tasks

Running the CLI without a command lists every task:

```bash
tasks-cli
```

It prints the number of tasks and a table containing each task's ID,
description, and status. If there are no tasks, it prints a message explaining
how to get started.

### Add a task

```bash
tasks-cli add
tasks-cli a
```

The `a` alias is short for `add`. You will be prompted for a task description
and a status:

- `not started` (`ns`)
- `work in progress` (`wip`)
- `completed` (`done`)

Example session:

```text
$ tasks-cli a
? Describe the task: Write project documentation
? Task Status: not started
task created
```

The description cannot be blank. Each task receives a six-character generated
ID, which is used by the update and remove commands.

### List not-started tasks

```bash
tasks-cli list-ns
tasks-cli ns
```

Lists tasks whose status is `ns`.

### List work-in-progress tasks

```bash
tasks-cli list-wip
tasks-cli wip
```

Lists tasks whose status is `wip`.

### List completed tasks

```bash
tasks-cli list-done
tasks-cli d
```

The `d` alias is short for `list-done`. It lists tasks whose status is `done`.

### Remove a task

```bash
tasks-cli remove
tasks-cli r
```

The `r` alias is short for `remove`. Enter the task's ID when prompted:

```text
$ tasks-cli r
? Task id: abc123
The task with id abc123 has been deleted
```

If the ID does not exist, the CLI reports that the task was not found. The ID
cannot be blank.

### Update a task

```bash
tasks-cli update
tasks-cli u
```

The `u` alias is short for `update`. Enter a task ID, then provide a new
description and choose a new status.

```text
$ tasks-cli u
? Task id: abc123
? New Description: Finish the task-cli README
? Task Status: completed
task updated
```

## Status values

Tasks use the following stored status values:

| Displayed status | Stored value | List command       |
| ---------------- | ------------ | ------------------ |
| Not started      | `ns`         | `list-ns` / `ns`   |
| Work in progress | `wip`        | `list-wip` / `wip` |
| Completed        | `done`       | `list-done` / `d`  |

## Help and version

Commander provides the standard help and version commands:

```bash
tasks-cli --help
tasks-cli -h
tasks-cli --version
tasks-cli -V
```

The current version is `1.0.0`.

## Data storage

Tasks are stored in the MongoDB collection created from the `Tasks` model. Each
task contains:

- `_id`: a generated six-character string
- `description`: the required task text
- `status`: `ns`, `wip`, or `done`
- `createdAt` and `updatedAt`: timestamps managed by Mongoose

<br><br>

> _project inspired by [roadmap.sh](https://roadmap.sh/projects/task-tracker)_
