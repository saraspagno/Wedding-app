export type BusTime = 'none' | '16:30' | '17:00';

export interface Guest {
  fullName: string;
  coming?: boolean;
  busTime?: BusTime;
}

export interface GuestGroup {
  id: string;
  groupInvite: string;
  contact: string;
  rsvpCode?: string;
  guests: Guest[];
} 