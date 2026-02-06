import random
o = "rock", "paper", "scissors"

p = "Player"
c = "Computer"

print("\nWelcome to Rock-Paper-Scissors!")

print("\nHow many rounds would you like to play? (Enter a number or 'infinite' for endless mode)")
while True:
    rounds_input = input().lower()
    if rounds_input == "infinite":
        rounds = float('inf')
        break
    elif rounds_input.isdigit() and int(rounds_input) > 0:
        rounds = int(rounds_input)
        break
    else:
        print("Invalid input. Please enter a positive number or 'infinite'.")

print("\nEnter your choice: (rock, paper, scissors)")

while True:
    player_choice = input().lower()

    if player_choice == "z":
        print("\nThanks for playing!")
        break

    if player_choice not in o:
        print("Invalid choice. Please enter rock, paper, or scissors.")
        continue

    computer_choice = random.choice(o)
    print(f"\n{p} chose: {player_choice}")
    print(f"{c} chose: {computer_choice}")

    if player_choice == computer_choice:
        print("\nIt's a tie!")
    elif (player_choice == "rock" and computer_choice == "scissors") or \
         (player_choice == "paper" and computer_choice == "rock") or \
         (player_choice == "scissors" and computer_choice == "paper"):  
        print("\nYou win!")
    else:
        print("\nComputer wins!") 

    if rounds != float('inf'):
        rounds -= 1
        if rounds == 0:
            print("\nGame over! Thanks for playing!")
            print(f"\nWinner of this game is: {p if player_choice == computer_choice else c}\n")
            break
        else:
            print(f"Rounds left: {rounds}\n")

