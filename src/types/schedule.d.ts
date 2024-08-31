import type { Run } from "./run";

export interface ScheduleWithoutRunsInfo {
  id: string;
  name: string;
  start_time_mili: number;
  end_time_mili: number;
  setup_time_mili: number;
  event_id: string;
  runs: string[];
}

export interface Schedule {
  id: string;
  name: string;
  start_time_mili: number;
  end_time_mili: number;
  setup_time_mili: number;
  event_id: string;
  runs: Run[];
  ordered_runs: Run[];
  backup_runs: Run[];
}

export interface ScheduleDTO {
  name: string;
  start_time_mili: number;
  end_time_mili: number;
  setup_time_mili: number;
  event_id: string;
}

export interface ManageSchedule extends Schedule {
  rows: ManageScheduleRow[];
}

export interface ManageScheduleRow {
  index_mine?: number;
  _id: string;
  start: string;
  dayRow: boolean;
  newDay: boolean;
  dayText: string;
  time: string;
  row: Run;
}