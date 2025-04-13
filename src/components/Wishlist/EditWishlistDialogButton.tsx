import {
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    PopoverProps,
    Unspaced,
    XStack,
    YStack,
} from 'tamagui';
import { Edit3, Plus, X } from '@tamagui/lucide-icons';
import { useWishlists } from '@/contexts/WishlistContext';
import { useEffect, useState } from 'react';
import { Wishlist } from '@/types/interfaces/wishlist';

export function EditWishlistDialogButton({
    Wishlist,
    afterEdit,
    ...props
}: PopoverProps & { Wishlist: Wishlist; afterEdit?: (id: string, name: string) => void }) {
    const { items: wishlists, updateItem: updateWishlistById } = useWishlists();
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(true);

    const checkExistingNameInWishlist = (name: string) => {
        return wishlists.some(wishlist => wishlist.name === name);
    };

    useEffect(() => {
        setIsValid(!checkExistingNameInWishlist(name));
    }, [name]);

    const handleEditWishlist = async (name: string) => {
        if (isValid) {
            updateWishlistById(Wishlist.id, { ...Wishlist, name });
            afterEdit && afterEdit(Wishlist.id, name);
        }
    };

    return (
        <Dialog modal>
            <Dialog.Trigger asChild>
                <Button chromeless padding={'$3'} icon={Edit3} />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    key='overlay'
                    animation='slow'
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Dialog.Content
                    elevate
                    key='content'
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    borderWidth={0}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    width={'90%'}
                    gap={'$3'}
                    backgroundColor={'$black2'}
                >
                    <Dialog.Title size={'$7'}>Edit Wishlist</Dialog.Title>
                    <YStack>
                        <Fieldset horizontal borderWidth={0} gap={'$3'}>
                            <Label>Name:</Label>
                            <Input
                                size={'$3'}
                                onChangeText={setName}
                                defaultValue={Wishlist.name}
                                style={{
                                    borderColor: isValid ? undefined : '#ff5050',
                                    color: isValid ? undefined : '#ff9999',
                                }}
                            />
                        </Fieldset>
                    </YStack>

                    <XStack justifyContent={'flex-end'} gap={'$3'}>
                        <Dialog.Close displayWhenAdapted asChild>
                            <Button size={'$3'} chromeless>
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close displayWhenAdapted asChild>
                            <Button
                                size={'$3'}
                                theme='active'
                                aria-label='Close'
                                disabled={!isValid}
                                onPress={() => handleEditWishlist(name)}
                            >
                                Edit
                            </Button>
                        </Dialog.Close>
                    </XStack>

                    <Unspaced>
                        <Dialog.Close asChild>
                            <Button
                                position='absolute'
                                top='$3'
                                right='$3'
                                size='$2'
                                circular
                                icon={X}
                            />
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
