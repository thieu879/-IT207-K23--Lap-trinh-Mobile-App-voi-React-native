import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

function UtilityItem({ icon, label }: { icon: React.ComponentProps<typeof IconSymbol>['name']; label: string }) {
  return (
    <View style={{ alignItems: 'center', width: '25%', marginVertical: 12 }}>
      <View
        style={{
          backgroundColor: '#F0F3F6',
          width: 56,
          height: 56,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconSymbol name={icon} size={26} color={'#0A84FF'} />
      </View>
      <Text style={{ marginTop: 6, fontSize: 13, color: '#222' }}>{label}</Text>
    </View>
  );
}

export default function DiscoverScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Search bar */}
      <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
        <View
          style={{
            backgroundColor: '#E9EEF3',
            borderRadius: 12,
            paddingHorizontal: 12,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconSymbol name="magnifyingglass" size={18} color={'#6B7280'} />
          <TextInput placeholder="Tìm kiếm" placeholderTextColor={'#6B7280'} style={{ marginLeft: 8, flex: 1 }} />
        </View>
      </View>

      {/* Utilities grid */}
      <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
        <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>Tiện ích cho bạn</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <UtilityItem icon="cart.fill" label="Shop" />
          <UtilityItem icon="car.fill" label="Home & Car" />
          <UtilityItem icon="creditcard.fill" label="Nạp tiền DT" />
          <UtilityItem icon="building.columns.fill" label="eGovernment" />
          <UtilityItem icon="wallet.pass.fill" label="Ví ZaloPay" />
          <UtilityItem icon="bolt.fill" label="Tiện ích" />
          <UtilityItem icon="doc.text.fill" label="Trả Hóa Đơn" />
          <UtilityItem icon="square.grid.2x2.fill" label="Fiza" />
          <UtilityItem icon="seal.fill" label="Tích lũy" />
          <UtilityItem icon="square.grid.3x2.fill" label="Mini Apps" />
        </View>
      </View>

      {/* Lottery card */}
      <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
        <View
          style={{
            backgroundColor: '#fff6ed',
            borderRadius: 16,
            padding: 12,
            borderWidth: 1,
            borderColor: '#fde1c3',
          }}>
          <Text style={{ fontWeight: '600', color: '#EA580C', marginBottom: 8 }}>Xem chi tiết kết quả hôm nay</Text>
          {[
            { city: 'Đà Lạt', result: '440765' },
            { city: 'Tiền Giang', result: '864379' },
            { city: 'Kiên Giang', result: '556519' },
          ].map((row) => (
            <View key={row.city} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
              <Text style={{ color: '#374151' }}>{row.city}</Text>
              <Text style={{ color: '#111827', fontWeight: '600' }}>{row.result}</Text>
            </View>
          ))}
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#f59e0b',
                paddingHorizontal: 12,
                height: 36,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <Text style={{ color: '#c2410c' }}>KQ xổ số hằng ngày</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#fde68a',
                paddingHorizontal: 12,
                height: 36,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: '#7c2d12', fontWeight: '600' }}>Dò ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Nearby food section */}
      <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
        <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>Món ngon gần bạn trên Zalo Connect</Text>
        <View style={{ backgroundColor: '#F3F4F6', height: 44, borderRadius: 12 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          {[
            { icon: 'fork.knife', label: 'Gần bạn' },
            { icon: 'bag.fill', label: 'Thực phẩm' },
            { icon: 'mappin.and.ellipse', label: 'Vị trí' },
            { icon: 'flame.fill', label: 'Đặc sản' },
          ].map((item) => (
            <View key={item.label} style={{ alignItems: 'center', flex: 1 }}>
              <View style={{ backgroundColor: '#E5F2FF', width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                <IconSymbol name={item.icon as any} size={22} color={'#0A84FF'} />
              </View>
              <Text style={{ marginTop: 6 }}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}


