import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Conversation = {
  id: string;
  name: string;
  message: string;
  time: string;
  unread?: number;
  tag?: string;
};

function ConversationRow({ item }: { item: Conversation }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10 }}>
      <View
        style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#E6F2FF', alignItems: 'center', justifyContent: 'center' }}>
        <IconSymbol name="person.crop.circle.fill" size={26} color={'#0A84FF'} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ color: '#6B7280', fontSize: 12 }}>{item.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          {item.tag ? (
            <View style={{ backgroundColor: '#E5F2FF', borderRadius: 6, paddingHorizontal: 6, height: 18, justifyContent: 'center', marginRight: 6 }}>
              <Text style={{ fontSize: 11, color: '#0A84FF' }}>{item.tag}</Text>
            </View>
          ) : null}
          <Text numberOfLines={1} style={{ color: '#4B5563', flex: 1 }}>
            {item.message}
          </Text>
          {item.unread ? (
            <View style={{ backgroundColor: '#EF4444', borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, marginLeft: 8 }}>
              <Text style={{ color: '#fff', fontSize: 11 }}>{item.unread}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default function MessagesScreen() {
  const conversations: Conversation[] = [
    { id: '1', name: 'Cloud của tôi', message: 'Cuộc trò chuyện này đang được ghim', time: '', tag: undefined },
    { id: '2', name: 'Media Box', message: 'Zing MP3: [APP] Hãy để KAKA khai...', time: '5 giờ', unread: 2 },
    { id: '3', name: 'Thời Tiết', message: 'Chất lượng không khí Sài Gòn ở...', time: '5 giờ', unread: 1 },
    { id: '4', name: 'Cộng đồng Game Online', message: 'Thư Giãn Sảng Khoái Cùng Crazy...', time: 'T4' },
    { id: '5', name: 'ZaloPay', message: 'Bạn có voucher Hóa đơn! Giảm 50K...', time: 'T2', unread: 2 },
    { id: '6', name: 'Zalo Sticker', message: 'Đang chơi dzui tự nhiên khựa...', time: 'T2', unread: 1 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Search + actions */}
      <View style={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#E9EEF3',
              borderRadius: 12,
              paddingHorizontal: 12,
              height: 40,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconSymbol name="magnifyingglass" size={18} color={'#6B7280'} />
            <TextInput placeholder="Tìm kiếm" placeholderTextColor={'#6B7280'} style={{ marginLeft: 8, flex: 1 }} />
          </View>
          <IconSymbol name="plus.circle.fill" size={26} color={'#0A84FF'} style={{ marginLeft: 10 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {conversations.map((c) => (
          <ConversationRow key={c.id} item={c} />
        ))}
      </ScrollView>
    </View>
  );
}


