 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/cruise-drink-tracker/App.tsx b/cruise-drink-tracker/App.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..ba53e1d53ca44075f5c15f0ff2b5d817f77d611e
--- /dev/null
+++ b/cruise-drink-tracker/App.tsx
@@ -0,0 +1,94 @@
+import React, { useEffect, useMemo, useState } from 'react';
+import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
+import * as Notifications from 'expo-notifications';
+import { bars, CHEERS_DAILY_COST, menu } from './src/data/mockData';
+import { addDrink, deleteDrink, getDrinks, initDb } from './src/services/db';
+import { DrinkLog, Flavor, Mood, AlcoholType } from './src/types';
+
+const TODAY = () => new Date().toISOString().slice(0, 10);
+
+export default function App() {
+  const [drinks, setDrinks] = useState<DrinkLog[]>([]);
+  const [selected, setSelected] = useState(menu[0]);
+  const [barId, setBarId] = useState(bars[0].id);
+  const [hydrationEnabled, setHydrationEnabled] = useState(true);
+  const [survey, setSurvey] = useState<{ flavor: Flavor; alcohol: AlcoholType; mood: Mood }>({ flavor: 'sweet', alcohol: 'rum', mood: 'party' });
+
+  const refresh = () => setDrinks(getDrinks());
+
+  useEffect(() => {
+    initDb();
+    refresh();
+  }, []);
+
+  const todays = useMemo(() => drinks.filter((d) => d.timestamp.startsWith(TODAY())), [drinks]);
+  const alcoholCount = todays.filter((d) => d.isAlcoholic).length;
+  const dailyValue = todays.reduce((sum, d) => sum + d.price, 0);
+  const tripValue = drinks.reduce((sum, d) => sum + d.price, 0);
+
+  const addSelected = async () => {
+    if (alcoholCount >= 15) {
+      Alert.alert('Limit reached', 'You have reached 15 drinks today. Add anyway?', [
+        { text: 'Cancel', style: 'cancel' },
+        { text: 'Add', onPress: () => addNow() }
+      ]);
+      return;
+    }
+    addNow();
+  };
+
+  const addNow = async () => {
+    addDrink({ name: selected.name, barId, timestamp: new Date().toISOString(), price: selected.price, isAlcoholic: selected.alcoholType === 'none' ? 0 : 1, favorite: 0 });
+    refresh();
+    const newCount = alcoholCount + (selected.alcoholType === 'none' ? 0 : 1);
+    if ([10, 13, 15].includes(newCount)) Alert.alert('Cheers Tracker', `You are at ${newCount}/15 drinks.`);
+    if (hydrationEnabled && newCount > 0 && newCount % 2 === 0) {
+      await Notifications.scheduleNotificationAsync({ content: { title: 'Time for water 💧', body: 'Stay hydrated to enjoy longer!' }, trigger: null });
+    }
+  };
+
+  const recs = menu.filter((d) => d.flavor === survey.flavor && d.alcoholType === survey.alcohol && d.moods.includes(survey.mood)).slice(0, 3);
+  const progress = Math.min(alcoholCount / 15, 1);
+
+  return (
+    <SafeAreaView style={styles.container}>
+      <Text style={styles.title}>Cruise Drink Tracker</Text>
+      <Text style={styles.metric}>{alcoholCount}/15 drinks today • Remaining {Math.max(0, 15 - alcoholCount)}</Text>
+      <View style={styles.barBg}><View style={[styles.barFill, { width: `${progress * 100}%` }]} /></View>
+      <Text style={styles.metric}>Daily value ${dailyValue.toFixed(2)} ({dailyValue >= CHEERS_DAILY_COST ? 'Ahead' : 'Behind'} vs ${CHEERS_DAILY_COST})</Text>
+      <Text style={styles.metric}>Trip value ${tripValue.toFixed(2)}</Text>
+
+      <View style={styles.card}><Text>Select drink</Text>
+        <TextInput value={selected.name} onChangeText={(t) => setSelected({ ...selected, name: t })} style={styles.input} />
+        <Pressable style={styles.button} onPress={addSelected}><Text style={styles.buttonText}>Quick Add Drink</Text></Pressable>
+      </View>
+
+      <View style={styles.row}><Text>Hydration reminders</Text><Switch value={hydrationEnabled} onValueChange={setHydrationEnabled} /></View>
+
+      <Text style={styles.subtitle}>Recommendations</Text>
+      <Text style={styles.small}>Flavor/alcohol/mood survey applied:</Text>
+      {recs.map((r) => <Text key={r.id} style={styles.small}>• {r.name} (${r.price}) @ {r.barIds.map((id) => bars.find((b) => b.id === id)?.name).join(', ')}</Text>)}
+
+      <Text style={styles.subtitle}>Today's History</Text>
+      <FlatList data={todays} keyExtractor={(i) => `${i.id}`} renderItem={({ item }) => (
+        <View style={styles.listRow}><Text>{item.name} • ${item.price}</Text><Pressable onPress={() => { deleteDrink(item.id); refresh(); }}><Text>Delete</Text></Pressable></View>
+      )} />
+    </SafeAreaView>
+  );
+}
+
+const styles = StyleSheet.create({
+  container: { flex: 1, backgroundColor: '#fff8ec', padding: 16 },
+  title: { fontSize: 28, fontWeight: '800', color: '#ff7a00' },
+  subtitle: { marginTop: 12, fontWeight: '700', fontSize: 18 },
+  small: { fontSize: 13, color: '#334' },
+  metric: { marginTop: 4, fontSize: 15 },
+  barBg: { height: 16, backgroundColor: '#fde4bd', borderRadius: 10, marginVertical: 8 },
+  barFill: { height: 16, backgroundColor: '#2cc7a3', borderRadius: 10 },
+  card: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginTop: 10 },
+  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginVertical: 8 },
+  button: { backgroundColor: '#0077ff', borderRadius: 12, padding: 12, alignItems: 'center' },
+  buttonText: { color: 'white', fontWeight: '700' },
+  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
+  listRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' }
+});
 
EOF
)
