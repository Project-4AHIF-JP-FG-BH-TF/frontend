<script setup lang="ts">
import { Types } from "~/types/enum";
import type { Columns } from "~/types/LogEntry";

const model = defineModel<Columns>();

const countActive = ref(6);

function change(type: Types) {
  switch (type) {
    case Types.DATE:
      model.value!.date = !model.value!.date;
      model.value?.date ? countActive.value++ : countActive.value--;

      break;
    case Types.LEVEL:
      model.value!.level = !model.value!.level;
      model.value?.level ? countActive.value++ : countActive.value--;

      break;
    case Types.IP_ADDRESS:
      model.value!.ip = !model.value!.ip;
      model.value?.ip ? countActive.value++ : countActive.value--;

      break;
    case Types.USER_ID:
      model.value!.user = !model.value!.user;
      model.value?.user ? countActive.value++ : countActive.value--;

      break;
    case Types.SESSION_ID:
      model.value!.session = !model.value!.session;
      model.value?.session ? countActive.value++ : countActive.value--;

      break;
    case Types.TEXT:
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
        @change="change(Types.DATE)"
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
        @change="change(Types.LEVEL)"
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
        @change="change(Types.IP_ADDRESS)"
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
        @change="change(Types.USER_ID)"
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
        @change="change(Types.SESSION_ID)"
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
        @change="change(Types.TEXT)"
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
