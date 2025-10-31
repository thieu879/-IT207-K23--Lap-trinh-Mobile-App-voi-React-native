import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Contact = { id: string; name: string; avatarColor: string };

const CONTACTS: Record<string, Contact[]> = {
  A: [{ id: '1', name: 'Ái Vân', avatarColor: '#FDE68A' }],
  B: [
    { id: '2', name: 'Ba Nam', avatarColor: '#BFDBFE' },
    { id: '3', name: 'Bảo Ngọc', avatarColor: '#FECACA' },
    { id: '4', name: 'Bee', avatarColor: '#D1FAE5' },
    { id: '5', name: 'Boss', avatarColor: '#FBCFE8' },
  ],
  C: [{ id: '6', name: 'Cường', avatarColor: '#FDE68A' }],
  D: [{ id: '7', name: 'Dũng', avatarColor: '#FECACA' }],
};

function ContactRow({ contact }: { contact: Contact }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 }}>
      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: contact.avatarColor, alignItems: 'center', justifyContent: 'center' }}>
        <IconSymbol name="person.fill" size={22} color={'#111827'} />
      </View>
      <Text style={{ marginLeft: 12, fontSize: 16, flex: 1 }}>{contact.name}</Text>
      <IconSymbol name="phone.fill" size={18} color={'#9CA3AF'} style={{ marginRight: 14 }} />
      <IconSymbol name="video.fill" size={18} color={'#9CA3AF'} />
    </View>
  );
}

export default function ContactsScreen() {
  const [segment, setSegment] = useState<'ban-be' | 'nhom' | 'oa'>('ban-be');

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Search */}
      <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
        <View style={{ backgroundColor: '#E9EEF3', borderRadius: 12, paddingHorizontal: 12, height: 40, flexDirection: 'row', alignItems: 'center' }}>
          <IconSymbol name="magnifyingglass" size={18} color={'#6B7280'} />
          <TextInput placeholder="Tìm bạn bè, tin nhắn…" placeholderTextColor={'#6B7280'} style={{ marginLeft: 8, flex: 1 }} />
          <IconSymbol name="slider.horizontal.3" size={18} color={'#6B7280'} />
        </View>
      </View>

      {/* Segments */}
      <View style={{ flexDirection: 'row', marginTop: 8, paddingHorizontal: 12 }}>
        {[
          { key: 'ban-be', label: 'BẠN BÈ' },
          { key: 'nhom', label: 'NHÓM' },
          { key: 'oa', label: 'OA' },
        ].map((s) => {
          const selected = segment === (s.key as any);
          return (
            <TouchableOpacity key={s.key} onPress={() => setSegment(s.key as any)} style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: selected ? '700' as const : '400' as const, color: selected ? '#111827' : '#9CA3AF' }}>{s.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Suggestions */}
      <View style={{ paddingHorizontal: 12, marginTop: 6 }}>
        <View style={{ backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12, height: 44, flexDirection: 'row', alignItems: 'center' }}>
          <IconSymbol name="person.badge.plus" size={18} color={'#0A84FF'} />
          <Text style={{ marginLeft: 8, color: '#111827' }}>Lời mời kết bạn</Text>
        </View>
        <View style={{ backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12, height: 44, flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <IconSymbol name="rectangle.stack.person.crop" size={18} color={'#0A84FF'} />
          <Text style={{ marginLeft: 8, color: '#111827' }}>Danh bạ máy</Text>
        </View>
      </View>

      {/* Contact list */}
      <ScrollView contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}>
        {Object.keys(CONTACTS).map((letter) => (
          <View key={letter}>
            <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
              <Text style={{ color: '#9CA3AF' }}>{letter}</Text>
            </View>
            {CONTACTS[letter].map((c) => (
              <ContactRow key={c.id} contact={c} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


