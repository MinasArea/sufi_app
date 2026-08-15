export function nextWeekday(targetDay, hour, minute, pushWeeks = 0) {
  const now = new Date(); const d = new Date(now);
  let diff = (targetDay - now.getDay() + 7) % 7;
  if (diff === 0 && (now.getHours() > hour || (now.getHours() === hour && now.getMinutes() >= minute))) diff = 7;
  d.setDate(now.getDate() + diff + pushWeeks * 7); d.setHours(hour, minute, 0, 0); return d;
}
export function getGatherings() {
  const items = [
    { title:'Thursday Evening Dhikr Circle', date:nextWeekday(4,19,30), location:'Main hall · arrive 7:20pm for tea', badge:'Weekly' },
    { title:'New Moon Sama — Poetry & Music', date:nextWeekday(5,20,0,1), location:'Garden room', badge:'Monthly' },
    { title:"Newcomers' Sitting", date:nextWeekday(0,18,0,2), location:'Library annex · no experience needed', badge:'Open house' },
    { title:'Study: The Conference of the Birds', date:nextWeekday(2,19,0,3), location:'Reading room · chapter 3', badge:'Study circle' },
  ]; return items.sort((a,b)=>a.date-b.date);
}
