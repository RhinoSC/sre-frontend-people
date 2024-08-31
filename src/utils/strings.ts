import type { Run } from "@/types/run";
import type { Team } from "@/types/team";
import type { User } from "@/types/user";

export const padTo2Digits = (num: number): string => {
  return num.toString().padStart(2, '0');
}

export const stringTimeToMS = (timeString: string): number => {
  let milliseconds = 0
  if (timeString.split(":").length > 2) {
    milliseconds =
      Number(timeString.split(":")[0]) * 3600000 +
      Number(timeString.split(":")[1]) * 60000 +
      Number(timeString.split(":")[2]) * 1000;
  } else {
    milliseconds =
      Number(timeString.split(":")[0]) * 60000 +
      Number(timeString.split(":")[1]) * 1000;
  }
  return milliseconds
}

export const MStoStringTime = (time: number): string => {
  const seconds = Math.floor((time / 1000) % 60)
  const minutes = Math.floor((time / 60000) % 60)
  const hours = Math.floor((time / 3600000) % 24)

  let result
  if (hours != 0) {
    result = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  } else {
    result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }
  return result
}

export const getRunnerString = (item: Run) => {
  const runnerArr = item.teams.map((team: Team) => {
    let teamString = team.players.map((player: User) => { return player.name })
    const teamAsString = teamString.join(', ')
    return teamAsString
  })
  return runnerArr.join(', ')
}

export const currencyFormat = (amount: number, currency?: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'EUR'
  })

  return formatter.format(amount)
}