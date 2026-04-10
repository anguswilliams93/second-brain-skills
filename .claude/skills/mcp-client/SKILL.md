---
name: mcp-client
description: Universal MCP client for connecting to any MCP server with progressive disclosure. Wraps MCP servers as skills to avoid context window bloat from tool definitions. Use when interacting with external MCP servers (Zapier, Sequential Thinking, GitHub, filesystem, etc.), listing available tools, or executing MCP tool calls. Triggers on requests like "connect to Zapier", "use MCP server", "list MCP tools", "call Zapier action", "use sequential thinking", or any MCP server interaction.
---

# Universal MCP Client

Connect to any MCP server with progressive disclosure - load tool schemas on-demand instead of dumping thousands of tokens into context upfront.

## Skill Location

This skill is located at: `.claude/skills/mcp-client/`

**Script path:** `.claude/skills/mcp-client/scripts/mcp_client.py`

## Configuration

The script looks for config in this order:
1. `MCP_CONFIG_PATH` env var (custom path)
2. **`references/mcp-config.json`** (this skill's config - recommended)
3. `.mcp.json` in project root
4. `~/.claude.json`

**Your config file:** `.claude/skills/mcp-client/references/mcp-config.json`

Edit this file to add your API keys. The example file (`example-mcp-config.json`) is kept as a reference template.

**If the user hasn't provided their Zapier API key yet, ask them for it.**

## Running Commands

All commands use the script at `.claude/skills/mcp-client/scripts/mcp_client.py`:

```bash
# List configured servers
python .claude/skills/mcp-client/scripts/mcp_client.py servers

# List tools from a server
python .claude/skills/mcp-client/scripts/mcp_client.py tools <server_name>

# Call a tool
python .claude/skills/mcp-client/scripts/mcp_client.py call <server> <tool> '{"arg": "value"}'
```

## Workflow

1. **Check config exists** - Run `servers` command. If error, create `.mcp.json`
2. **List servers** - See what MCP servers are configured
3. **List tools** - Get tool schemas from a specific server
4. **Call tool** - Execute a tool with arguments

## Commands Reference

| Command | Description |
|---------|-------------|
| `servers` | List all configured MCP servers |
| `tools <server>` | List tools with full parameter schemas |
| `call <server> <tool> '<json>'` | Execute a tool with arguments |

## Example: Zapier

```bash
# 1. List servers to confirm Zapier is configured
python .claude/skills/mcp-client/scripts/mcp_client.py servers

# 2. List Zapier tools
python .claude/skills/mcp-client/scripts/mcp_client.py tools zapier

# 3. Call a Zapier tool
python .claude/skills/mcp-client/scripts/mcp_client.py call zapier <tool_name> '{"param": "value"}'
```

## Example: Sequential Thinking

```bash
# 1. List tools
python .claude/skills/mcp-client/scripts/mcp_client.py tools sequential-thinking

# 2. Use sequential thinking
python .claude/skills/mcp-client/scripts/mcp_client.py call sequential-thinking sequentialthinking '{"thought": "Breaking down the problem...", "thoughtNumber": 1, "totalThoughts": 5, "nextThoughtNeeded": true}'
```

## Config Format

Config file format (`references/mcp-config.json`):

```json
{
  "mcpServers": {
    "zapier": {
      "url": "https://mcp.zapier.com/api/v1/connect",
      "api_key": "your-api-key"
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

**Transport detection:**
- `url` + `api_key` → FastMCP with Bearer auth (Zapier)
- `command` + `args` → stdio (local servers like sequential-thinking)
- `url` ending in `/sse` → SSE transport
- `url` ending in `/mcp` → Streamable HTTP

## Error Handling

Errors return JSON:
```json
{"error": "message", "type": "configuration|validation|connection"}
```

- `configuration` - Config file not found. Create `.mcp.json`
- `validation` - Invalid server or tool name
- `connection` - Failed to connect to server

## Dependencies

```bash
pip install mcp fastmcp
```

## Tool Index

Quick reference of all available tools per server. Use `tools <server>` for full parameter schemas.

### Zapier

| Tool | Description |
|------|-------------|
| `get_configuration_url` | Get URL to configure Zapier MCP actions |
| **Airtable** | |
| `airtable_get_all_records` | List all records from a table |
| `airtable_get_base_schema` | Get schema for a base |
| `airtable_find_record` | Search for a record |
| `airtable_find_record_by_id` | Get record by ID |
| `airtable_find_table` | Search for a table |
| `airtable_find_table_by_id` | Get table by ID |
| `airtable_find_base` | Search for a base |
| `airtable_find_base_by_id` | Get base by ID |
| `airtable_add_comment_to_record` | Add comment to a record |
| `airtable_create_record` | Create a record |
| `airtable_create_records_advanced` | Create multiple records |
| `airtable_create_base` | Create a new base |
| `airtable_create_or_update_record` | Upsert a record |
| `airtable_create_table` | Create a new table |
| `airtable_delete_record` | Delete a record |
| `airtable_update_record` | Update a record |
| `airtable_update_multiple_records` | Update multiple records |
| `airtable_api_request_beta` | Raw Airtable API request |
| **Gmail** | |
| `gmail_find_email` | Search for emails |
| `gmail_send_email` | Send an email |
| `gmail_create_draft` | Create a draft |
| `gmail_create_draft_reply` | Create a draft reply |
| `gmail_reply_to_email` | Reply to an email |
| `gmail_add_label_to_email` | Add label to email |
| `gmail_remove_label_from_email` | Remove label from email |
| `gmail_remove_label_from_conversation` | Remove label from conversation |
| `gmail_archive_email` | Archive an email |
| `gmail_delete_email` | Delete an email |
| `gmail_get_attachment_by_filename` | Get attachment by filename |
| `gmail_create_label` | Create a label |
| **Google Calendar** | |
| `google_calendar_find_events` | Search events |
| `google_calendar_retrieve_event_by_id` | Get event by ID |
| `google_calendar_find_busy_periods_in_calendar` | Find busy periods |
| `google_calendar_find_calendars` | Search calendars |
| `google_calendar_get_calendar_information` | Get calendar info |
| `google_calendar_create_detailed_event` | Create event |
| `google_calendar_quick_add_event` | Quick add event |
| `google_calendar_update_event` | Update event |
| `google_calendar_delete_event` | Delete event |
| `google_calendar_add_attendee_s_to_event` | Add attendees |
| `google_calendar_create_calendar` | Create calendar |
| `google_calendar_move_event_to_another_calendar` | Move event |
| `google_calendar_api_request_beta` | Raw Calendar API request |
| **Confluence Cloud** | |
| `confluence_cloud_search_for_page_or_blog_post` | Search pages/posts |
| `confluence_cloud_create_page_or_blog_post` | Create page/post |
| `confluence_cloud_api_request_beta` | Raw Confluence API request |

### GitHub

| Tool | Description |
|------|-------------|
| **Repos & Files** | |
| `search_repositories` | Search for repos |
| `create_repository` | Create a new repo |
| `fork_repository` | Fork a repo |
| `create_branch` | Create a new branch |
| `list_commits` | List commits on a branch |
| `create_or_update_file` | Create/update a single file |
| `get_file_contents` | Get file or directory contents |
| `push_files` | Push multiple files in one commit |
| `search_code` | Search code across repos |
| **Issues** | |
| `create_issue` | Create a new issue |
| `list_issues` | List/filter issues |
| `get_issue` | Get issue details |
| `update_issue` | Update an issue |
| `add_issue_comment` | Comment on an issue |
| `search_issues` | Search issues & PRs |
| `search_users` | Search GitHub users |
| **Pull Requests** | |
| `create_pull_request` | Create a PR |
| `get_pull_request` | Get PR details |
| `list_pull_requests` | List/filter PRs |
| `get_pull_request_files` | Get files changed in a PR |
| `get_pull_request_status` | Get PR check status |
| `get_pull_request_comments` | Get PR review comments |
| `get_pull_request_reviews` | Get PR reviews |
| `create_pull_request_review` | Create a PR review |
| `merge_pull_request` | Merge a PR |
| `update_pull_request_branch` | Update PR branch from base |

### Brave Search

| Tool | Description |
|------|-------------|
| `brave_web_search` | Web search (news, articles, general queries) |
| `brave_local_search` | Local business/place search |

### Context7

| Tool | Description |
|------|-------------|
| `resolve-library-id` | Resolve a library name to a Context7 ID |
| `query-docs` | Query up-to-date library documentation |

## References

- `references/example-mcp-config.json` - Template config file
- `references/mcp-servers.md` - Common server configurations
- `references/python-mcp-sdk.md` - Python SDK documentation
