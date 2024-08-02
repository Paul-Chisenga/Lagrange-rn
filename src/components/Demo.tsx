import { SwipeModal } from "@/components/SwipeModal";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { authContext } from "@/context/auth";
import { sleep } from "@/utils/functions";
import { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox } from "expo-checkbox";
import { Colors } from "@/constants/Colors";
import { MineCard } from "@/components/MineCard";
import { ProjectCard } from "@/components/ProjectCard";
import { SequestCard } from "@/components/SequestCard";
import { PaymentMethodCard } from "@/components/PaymentMethodCard";
import { ThemedButton1 } from "./ThemedButton1";
import PushDownIcon from "../../assets/svgs/PushDownIcon";
import RepeatIcon from "../../assets/svgs/RepeatIcon";
import ShareIcon from "../../assets/svgs/ShareIcon";
import { ThemedButton2 } from "./ThemedButton2";
import ArrowLongRight from "../../assets/svgs/ArrowLongRight";

const mpsa = require("../../assets/images/mpesa.png");

export function Demo() {
  const { signOut } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSignOut() {
    try {
      setIsLoading(true);
      await sleep(3000);
      await signOut();
    } catch (error) {
      throw new Error("Sign Out failed");
    }
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedButton
        type="outline"
        onPress={handleSignOut}
        icon={{ name: "log-out" }}
        variant="accent_2"
        style={{ margin: 20 }}
      >
        {isLoading ? "Please wait" : "Sign Out"}
      </ThemedButton>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{
            columnGap: 12,
            paddingHorizontal: 12,
          }}
          style={{
            marginVertical: 10,
          }}
        >
          <MineCard title={"ewaso rehabilitation"} variant={"accent_1"} />
          <MineCard title={"Nairobi Rehabilitation"} variant={"default"} />
          <MineCard title={"jamuhuri wetland"} variant={"accent_2"} />
        </ScrollView>
        <View style={{ rowGap: 25, marginVertical: 25 }}>
          <ProjectCard
            image="project_1"
            title="Ireti site"
            subtitle="Controlled space"
          />
          <ProjectCard
            image="project_2"
            title="Juja site"
            subtitle="Controlled space"
          />
          <ProjectCard
            image="project_3"
            title="Adr wetland"
            subtitle="Controlled space"
          />
        </View>
        <View style={{ rowGap: 25, marginVertical: 25, paddingHorizontal: 12 }}>
          <SequestCard project={"Jackson Wandemi"} trees={500} carbon={47.71} />
          <SequestCard project={"Milson Nyabuto"} trees={500} carbon={47.71} />
          <SequestCard project={"Ian Muriuko"} trees={500} carbon={47.71} />
        </View>
        <View style={{ rowGap: 25, marginVertical: 25, paddingHorizontal: 12 }}>
          <PaymentMethodCard
            title={"Mpesa"}
            img={{
              source: mpsa,
              height: 53,
              width: 91,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <ThemedText type="title">Upcoming events</ThemedText>
          <ThemedText type="subtitle">Coming this week</ThemedText>
          <ThemedText type="default">
            Edit app/index.tsx to edit this screen.
          </ThemedText>
          <ThemedText type="defaultSemiBold">Edit this screen</ThemedText>

          <ThemedButton type="link" style={{ marginVertical: 10 }}>
            Register
          </ThemedButton>
        </View>
        <ThemedView
          style={{
            rowGap: 10,
            padding: 15,
            marginBottom: 10,
          }}
          lightColor="#eee"
        >
          <ThemedButton
            icon={{ name: "add" }}
            onPress={() => setShowModal(true)}
          >
            Primary
          </ThemedButton>
          <ThemedButton variant="accent_1" icon={{ name: "trending-down" }}>
            Green
          </ThemedButton>
          <ThemedButton variant="accent_2" icon={{ name: "person-add" }}>
            Yellow
          </ThemedButton>
          <ThemedButton variant="white" icon={{ name: "newspaper" }}>
            White
          </ThemedButton>
        </ThemedView>
        <ThemedView
          style={{
            padding: 20,
            margin: 10,
            marginBottom: 50,
            flexDirection: "row",
          }}
          lightColor="#eee"
        >
          <View style={{ rowGap: 10, flex: 1 }}>
            <ThemedButton icon={{ name: "add" }} />
            <ThemedButton icon={{ name: "arrow-back" }} variant="accent_1" />
            <ThemedButton icon={{ name: "arrow-forward" }} variant="accent_2" />
            <ThemedButton icon={{ name: "airplane" }} variant="white" />
          </View>
          <View style={{ rowGap: 10, flex: 1 }}>
            <Checkbox color={Colors.light.tint.default} value={true} />
            <Checkbox color={Colors.light.tint.accent_1} />
            <Checkbox color={Colors.light.tint.accent_2} />
            <Checkbox color={Colors.light.tint.white} />
          </View>
          <View style={{ rowGap: 10, flex: 1 }}>
            <ThemedButton1 iconName={"share-social"} variant="accent_3">
              Convert
            </ThemedButton1>
            <ThemedButton1 Icon={RepeatIcon} variant="accent_4">
              Withdraw
            </ThemedButton1>
            <ThemedButton1 Icon={ShareIcon}>Add</ThemedButton1>
            <ThemedButton1
              iconName={"arrow-back"}
              Icon={PushDownIcon}
              variant="accent_1"
            >
              Back
            </ThemedButton1>
          </View>
          <View style={{ rowGap: 10, flex: 1 }}>
            <ThemedButton1
              iconName={"share-social"}
              variant="accent_3"
              type="outline"
            >
              Convert
            </ThemedButton1>
            <ThemedButton1 Icon={RepeatIcon} variant="accent_2" type="outline">
              Withdraw
            </ThemedButton1>
            <ThemedButton1 Icon={ShareIcon} type="outline">
              Add
            </ThemedButton1>
            <ThemedButton1
              iconName={"arrow-back"}
              Icon={PushDownIcon}
              variant="accent_1"
              type="outline"
            >
              Back
            </ThemedButton1>
          </View>
        </ThemedView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 50,
          }}
        >
          <ThemedButton1 iconName={"share-social"} variant="accent_3">
            Convert
          </ThemedButton1>
          <ThemedButton1 Icon={RepeatIcon} variant="accent_4">
            Withdraw
          </ThemedButton1>
          <ThemedButton1 Icon={ShareIcon}>Add</ThemedButton1>
          <ThemedButton1
            iconName={"arrow-back"}
            Icon={PushDownIcon}
            variant="accent_1"
          >
            Back
          </ThemedButton1>
        </View>
        <View style={{ rowGap: 10, flex: 1, marginBottom: 50 }}>
          <ThemedButton2 iconName={"share-social"} variant="accent_3">
            Convert
          </ThemedButton2>
          <ThemedButton2 Icon={RepeatIcon} variant="accent_2">
            Withdraw
          </ThemedButton2>
          <ThemedButton2 Icon={ShareIcon}>Add</ThemedButton2>
          <ThemedButton2
            iconName={"arrow-back"}
            Icon={PushDownIcon}
            variant="accent_1"
          >
            Back
          </ThemedButton2>
          <ThemedButton2>See all</ThemedButton2>
          <ThemedButton2 Icon={ArrowLongRight}></ThemedButton2>
        </View>
        <SwipeModal visible={showModal} onDismiss={() => setShowModal(false)}>
          <ThemedView
            style={{
              rowGap: 10,
              margin: 10,
              padding: 20,
            }}
          >
            <ThemedTextInput label="First Name" placeholder="Enter your name" />
            <ThemedTextInput label="Last Name" placeholder="Enter your name" />
            <ThemedTextInput
              label="Email"
              placeholder="Email address"
              message="An error occured"
            />
            <ThemedButton icon={{ name: "add" }} />
            <ThemedButton variant="accent_1">Green</ThemedButton>
            <ThemedButton
              icon={{ name: "log-in" }}
              onPress={() => setShowModal(false)}
            >
              Submit
            </ThemedButton>
          </ThemedView>
        </SwipeModal>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
