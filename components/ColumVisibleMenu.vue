<script setup lang="ts">
import { ColumnType } from "~/types/ColumnType";
import type { Columns } from "~/types/LogEntry";

const model = defineModel<Columns>();

const countActive = ref(6);

function change(type: ColumnType) {
  switch (type) {
    case ColumnType.DATE:
      model.value!.date = !model.value!.date;
      model.value?.date ? countActive.value++ : countActive.value--;

      break;
    case ColumnType.LEVEL:
      model.value!.level = !model.value!.level;
      model.value?.level ? countActive.value++ : countActive.value--;

      break;
    case ColumnType.IP_ADDRESS:
      model.value!.ip = !model.value!.ip;
      model.value?.ip ? countActive.value++ : countActive.value--;

      break;
    case ColumnType.USER_ID:
      model.value!.user = !model.value!.user;
      model.value?.user ? countActive.value++ : countActive.value--;

      break;
    case ColumnType.SESSION_ID:
      model.value!.session = !model.value!.session;
      model.value?.session ? countActive.value++ : countActive.value--;

      break;
    case ColumnType.TEXT:
      model.value!.text = !model.value!.text;
      model.value?.text ? countActive.value++ : countActive.value--;
  }
}
</script>

<template>
  <div id="outer">
    <h1>Spalten Sichtbarkeit</h1>

    <div>
      <input
        id="date"
        type="checkbox"
        name="date"
        :checked="model?.date"
        :disabled="countActive === 1 && model?.date"
        @change="change(ColumnType.DATE)"
      />
      <label for="date">Datum</label>
    </div>

    <div>
      <input
        id="level"
        type="checkbox"
        name="level"
        :checked="model?.level"
        :disabled="countActive === 1 && model?.level"
        @change="change(ColumnType.LEVEL)"
      />
      <label for="level">Level</label>
    </div>

    <div>
      <input
        id="ipaddress"
        type="checkbox"
        name="ipaddress"
        :checked="model?.ip"
        :disabled="countActive === 1 && model?.ip"
        @change="change(ColumnType.IP_ADDRESS)"
      />
      <label for="IpAddress">IP-Adresse</label>
    </div>

    <div>
      <input
        id="userID"
        type="checkbox"
        name="userID"
        :checked="model?.user"
        :disabled="countActive === 1 && model?.user"
        @change="change(ColumnType.USER_ID)"
      />
      <label for="userID">Nutzer-ID</label>
    </div>

    <div>
      <input
        id="sessionID"
        type="checkbox"
        name="sessionID"
        :checked="model?.session"
        :disabled="countActive === 1 && model?.session"
        @change="change(ColumnType.SESSION_ID)"
      />
      <label for="sessionID">Sitzungs-ID</label>
    </div>

    <div>
      <input
        id="text"
        type="checkbox"
        name="text"
        :checked="model?.text"
        :disabled="countActive === 1 && model?.text"
        @change="change(ColumnType.TEXT)"
      />
      <label for="text">Text</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
#outer {
  background-color: var(--base-background);
  border-radius: 10px;
  box-shadow: transparentize(#1f2836, 0.1) 5px 5px 10px;

  display: flex;
  flex-direction: column;
  width: 200px;

  padding: 10px;

  div {
    text-align: left;

    input {
      margin: 10px;
    }
  }
}
</style>
